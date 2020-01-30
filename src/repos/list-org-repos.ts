import {ReposListForOrgResponseItem} from '@octokit/rest';
import {getClient} from '../rest-client';

export async function listOrgRepos(org: string): Promise<ReposListForOrgResponseItem[]> {
  let page = 1;
  let hasMore = false;

  const repos: unknown[] = [];

  do {
    const data = await list(org, page);

    hasMore = data.length === 100;
    page++;

    repos.push(...data);
  } while (hasMore);

  return repos as ReposListForOrgResponseItem[];
}

async function list(org: string, page: number): Promise<ReposListForOrgResponseItem[]> {
  const gh = getClient();
  const {data} = await gh.repos.listForOrg({
    org,
    type: 'all',
    sort: 'pushed',
    per_page: 100,
    page,
    direction: 'desc'
  });

  return data;
}