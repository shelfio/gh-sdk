import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getRepoBranch} from './get-repo-branches';

type LatestBranchCommit =
  | RestEndpointMethodTypes['repos']['getBranch']['response']['data']['commit']
  | undefined;

export async function getLatestBranchCommit({
  owner,
  repo,
  branch,
}: Parameters<typeof getRepoBranch>[0]): Promise<LatestBranchCommit> {
  const branchResponse = await getRepoBranch({
    owner,
    repo,
    branch,
  });

  return branchResponse?.commit;
}

export async function getLatestDevelopCommit({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<LatestBranchCommit> {
  return getLatestBranchCommit({
    owner,
    repo,
    branch: 'develop',
  });
}

export async function getLatestDevelopCommitSHA({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<string> {
  const commit = await getLatestDevelopCommit({owner, repo});

  return commit?.sha || '';
}
