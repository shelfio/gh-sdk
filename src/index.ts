import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from './rest-client';

export * from './prs';
export * from './repos';

interface ApprovePRParams {
  owner: string;
  repo: string;
  pr: number;
}

export async function approvePR(
  params: ApprovePRParams
): Promise<RestEndpointMethodTypes['pulls']['createReview']['response']['data']> {
  const gh = getClient();

  const {data} = await gh.pulls.createReview({
    owner: params.owner,
    repo: params.repo,
    event: 'APPROVE',
    pull_number: params.pr,
  });

  return data;
}

export async function mergePR(
  params: ApprovePRParams
): Promise<RestEndpointMethodTypes['pulls']['merge']['response']['data']> {
  const gh = getClient();

  const {data} = await gh.pulls.merge({
    repo: params.repo,
    pull_number: params.pr,
    owner: params.owner,
    merge_method: 'merge',
  });

  return data;
}

export async function getUserOrgs(): Promise<string[]> {
  const gh = getClient();
  const {data} = await gh.orgs.listForAuthenticatedUser();
  const orgNames = data.map(item => item.login);

  return orgNames.sort();
}
