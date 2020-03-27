import {Octokit} from '@octokit/rest';
import {getClient} from '../rest-client';

export async function createReleaseBranch({
  owner,
  repo,
  version,
  sha
}: {
  owner: string;
  repo: string;
  version: string;
  sha: string;
}): Promise<Octokit.GitCreateRefResponse> {
  const gh = getClient();
  const branchName = `release/v${version}`;

  const {data} = await gh.git.createRef({
    owner,
    repo,
    ref: branchName,
    sha
  });

  return data;
}
