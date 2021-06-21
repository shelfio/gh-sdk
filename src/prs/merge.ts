import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

type MergePRParams = {
  owner: string;
  repo: string;
  pr: number;
};

export async function mergePR(
  params: MergePRParams
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
