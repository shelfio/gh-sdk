import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

type RepoType = RestEndpointMethodTypes['repos']['listForOrg']['parameters']['type'];

export async function listOrgRepos(
  org: string,
  type: RepoType = 'all'
): Promise<RestEndpointMethodTypes['repos']['listForOrg']['response']['data']> {
  let page = 1;
  let hasMore = false;

  const repos: RestEndpointMethodTypes['repos']['listForOrg']['response']['data'] = [];

  do {
    const data = await list(org, page, type);

    hasMore = data.length === 100;
    page++;

    repos.push(...data);
  } while (hasMore);

  return repos;
}

async function list(
  org: string,
  page: number,
  type: RepoType
): Promise<RestEndpointMethodTypes['repos']['listForOrg']['response']['data']> {
  const gh = getClient();
  const {data} = await gh.repos.listForOrg({
    org,
    type,
    sort: 'pushed',
    per_page: 100,
    page,
    direction: 'desc',
  });

  return data;
}
