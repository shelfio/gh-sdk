import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client.js';

type RepoType = RestEndpointMethodTypes['repos']['listForOrg']['parameters']['type'];

type ListOrgReposParams = {
  org: string;
  type?: RepoType;
  skipArchived?: boolean;
};

export async function listOrgRepos(
  params: ListOrgReposParams
): Promise<RestEndpointMethodTypes['repos']['listForOrg']['response']['data']> {
  const {org, type = 'all', skipArchived = false} = params;
  let page = 1;
  let hasMore = false;

  const repos: RestEndpointMethodTypes['repos']['listForOrg']['response']['data'] = [];

  do {
    const data = await list(org, page, type);

    hasMore = data.length === 100;
    page++;

    repos.push(...data);
  } while (hasMore);

  return repos.filter(repo => {
    if (skipArchived) {
      if (repo.archived) {
        return false;
      }
    }

    return true;
  });
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
