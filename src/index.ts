import Octokit from '@octokit/rest';
import {getClient} from './rest-client';

export {listOpenPRs} from './prs/list-open-prs';
export {listOrgRepos} from './repos/list-org-repos';

interface ApprovePRParams {
  owner: string;
  repo: string;
  pr: number;
}

export async function approvePR(
  params: ApprovePRParams
): Promise<Octokit.PullsCreateReviewResponse> {
  const gh = getClient();

  const {data} = await gh.pulls.createReview({
    owner: params.owner,
    repo: params.repo,
    event: 'APPROVE',
    pull_number: params.pr
  });

  return data;
}

export async function mergePR(params: ApprovePRParams): Promise<Octokit.PullsMergeResponse> {
  const gh = getClient();

  const {data} = await gh.pulls.merge({
    repo: params.repo,
    pull_number: params.pr,
    owner: params.owner,
    merge_method: 'merge'
  });

  return data;
}

export async function getUserOrgs(): Promise<string[]> {
  const gh = getClient();
  const {data} = await gh.orgs.listForAuthenticatedUser();
  const orgNames = data.map(item => item.login);

  return orgNames.sort();
}
