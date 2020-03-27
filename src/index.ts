import {Octokit} from '@octokit/rest';
import {getClient} from './rest-client';

export {listOpenPRs} from './prs/list-open-prs';
export {listOrgRepos} from './repos/list-org-repos';
export {getRepoBranch, getRepoBranches, getRepoBranchesNames} from './repos/get-repo-branches';
export {deleteBranch} from './repos/delete-branch';
export {createReleasePR} from './prs/create-release-pr';
export {createReleaseBranch} from './repos/create-release-branch';
export {
  getLatestBranchCommit,
  getLatestDevelopCommit,
  getLatestDevelopCommitSHA
} from './repos/get-latest-branch-commit';

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
