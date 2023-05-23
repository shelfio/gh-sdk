import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

type ListOpenPRsParams = {
  owner: string;
  searchText?: string;
};

type ListPRsParams = {
  owner: string;
  searchText?: string;
  prStatus: 'open' | 'closed';
};

export function listPrs(params: ListOpenPRsParams): ReturnType<typeof getPRs> {
  return getPRs({...params, prStatus: 'open'});
}

export async function getOpenRepoPRsFromHuman(owner: string, repo: string): Promise<any[]> {
  const gh = getClient();

  const {data} = await gh.pulls.list({
    owner,
    repo,
    state: 'open',
  });

  return data.filter(pr => !pr?.user?.login.endsWith('[bot]') && !pr.draft);
}

export async function getCommitChecks(
  owner: string,
  repo: string,
  commitRef: string
): Promise<any[]> {
  const gh = getClient();

  const {data} = await gh.request({
    method: 'GET',
    url: `/repos/${owner}/${repo}/commits/${commitRef}/statuses`,
  });

  return data;
}

export async function getPRCommitRefsWithMessages(owner: string, repo: string, prNumber: number) {
  const gh = getClient();

  const {data} = await gh.pulls.listCommits({
    owner,
    repo,
    pull_number: prNumber,
  });

  return data.map(commit => {
    return {
      sha: commit.sha,
      message: commit.commit.message,
    };
  });
}

export function listClosedPRs(params: ListOpenPRsParams): ReturnType<typeof getPRs> {
  return getPRs({...params, prStatus: 'closed'});
}

const prsGenerator = async function* (
  params: ListPRsParams
): AsyncGenerator<
  RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items']
> {
  let pageNumber = 1;
  let hasNextPage = true;

  while (hasNextPage && pageNumber <= 10) {
    const gh = getClient();

    const {data} = await gh.search.issuesAndPullRequests({
      per_page: 100,
      page: pageNumber,
      q: `is:${params.prStatus} is:pr archived:false user:${params.owner} ${
        params.searchText || ''
      }`,
    });

    if (data.items.length < 100) {
      hasNextPage = false;
    }

    pageNumber++;

    yield data.items;
  }
};

async function getPRs(
  params: ListPRsParams
): Promise<
  RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items']
> {
  const prs: RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items'] =
    [];

  for await (const prsOnePage of prsGenerator(params)) {
    prs.push(...prsOnePage);
  }

  return prs;
}
