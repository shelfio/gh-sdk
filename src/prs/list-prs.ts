import {SearchIssuesAndPullRequestsResponseData} from '@octokit/types';
import {getClient} from '../rest-client';

interface ListOpenPRsParams {
  owner: string;
  searchText?: string;
}

interface ListPRsParams {
  owner: string;
  searchText?: string;
  prStatus: 'open' | 'closed';
}

export async function listPrs(params: ListOpenPRsParams): ReturnType<typeof listPRs> {
  return listPRs({...params, prStatus: 'open'});
}

export async function listClosedPRs(params: ListOpenPRsParams): ReturnType<typeof listPRs> {
  return listPRs({...params, prStatus: 'closed'});
}

async function listPRs(
  params: ListPRsParams
): Promise<SearchIssuesAndPullRequestsResponseData['items']> {
  const prs: unknown[] = [];
  let page = 1;
  let totalCount = 0;

  do {
    const data = await search({
      page,
      q: `is:${params.prStatus} is:pr archived:false user:${params.owner} ${
        params.searchText || ''
      }`.trim(),
    });

    totalCount = data.total_count;
    prs.push(...data.items);

    page++;
  } while (prs.length < totalCount);

  return prs as SearchIssuesAndPullRequestsResponseData['items'];
}

async function search({
  q,
  page,
}: {
  q: string;
  page: number;
}): Promise<SearchIssuesAndPullRequestsResponseData> {
  // Because HttpError: Only the first 1000 search results are available
  if (page >= 11) {
    return {incomplete_results: false, items: [], total_count: 0};
  }

  const gh = getClient();

  const {data} = await gh.search.issuesAndPullRequests({
    per_page: 100,
    page,
    q,
  });

  return data;
}
