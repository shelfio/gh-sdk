import {ReposListForOrgResponseData} from '@octokit/types';
import {getClient} from '../rest-client';

export async function listOrgRepos(org: string): Promise<ReposListForOrgResponseData> {
  let page = 1;
  let hasMore = false;

  const repos: ReposListForOrgResponseData = [];

  do {
    const data = await list(org, page);

    hasMore = data.length === 100;
    page++;

    repos.push(...data);
  } while (hasMore);

  return repos;
}

async function list(org: string, page: number): Promise<ReposListForOrgResponseData> {
  const gh = getClient();
  const {data} = await gh.repos.listForOrg({
    org,
    type: 'all',
    sort: 'pushed',
    per_page: 100,
    page,
    direction: 'desc',
  });

  return data;
}
