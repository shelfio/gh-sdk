import {get} from 'lodash';
import {Octokit} from '@octokit/rest';
import {getRepoBranch} from './get-repo-branches';

type LatestBranchCommit = {
  author: {
    avatar_url: string;
    gravatar_id: string;
    id: number;
    login: string;
    url: string;
  };
  committer: {
    avatar_url: string;
    gravatar_id: string;
    id: number;
    login: string;
    url: string;
  };
  parents: Array<{
    sha: string;
    url: string;
  }>;
  node_id: string;
  sha: string;
  url: string;
  commit?: object;
};

export async function getLatestBranchCommit({
  owner,
  repo,
  branch
}: Octokit.ReposGetBranchParams): Promise<LatestBranchCommit> {
  const branchResponse = await getRepoBranch({
    owner,
    repo,
    branch
  });

  return get(branchResponse, 'commit', '');
}

export async function getLatestDevelopCommit({
  owner,
  repo
}: {
  owner: string;
  repo: string;
}): Promise<LatestBranchCommit> {
  return getLatestBranchCommit({
    owner,
    repo,
    branch: 'develop'
  });
}

export async function getLatestDevelopCommitSHA({
  owner,
  repo
}: {
  owner: string;
  repo: string;
}): Promise<string> {
  const commit = await getLatestDevelopCommit({owner, repo});

  return get(commit, 'sha', '');
}
