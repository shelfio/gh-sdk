import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

export async function createReleaseBranch({
  owner,
  repo,
  version,
  sha,
}: {
  owner: string;
  repo: string;
  version: string;
  sha: string;
}): Promise<RestEndpointMethodTypes['git']['createRef']['response']['data']> {
  const gh = getClient();
  const branchName = `refs/heads/release/v${version}`;

  const {data} = await gh.git.createRef({
    owner,
    repo,
    ref: branchName,
    sha,
  });

  return data;
}
