import {Octokit} from '@octokit/rest';
import {getClient} from '../rest-client';

export async function createReleaseBranch({
  owner,
  repo,
  version,
  commitHash
}: {
  owner: string;
  repo: string;
  version: string;
  commitHash: string;
}): Promise<Octokit.GitCreateRefResponse> {
  const gh = getClient();
  const branchName = `release/v${version}`;

  const {data} = await gh.git.createRef({
    owner,
    repo,
    ref: branchName,
    sha: commitHash
  });

  return data;
}
