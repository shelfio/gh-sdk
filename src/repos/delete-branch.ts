import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {OctokitResponse} from '@octokit/types';
import {getClient} from '../rest-client';

export async function deleteBranch({
  owner,
  repo,
  ref
}: RestEndpointMethodTypes['git']['deleteRef']['parameters']): Promise<OctokitResponse<any>> {
  const gh = getClient();

  try {
    const {data} = await gh.git.deleteRef({owner, repo, ref});

    return data;
  } catch (error) {
    console.error(
      `Error deleting branch, possibly branch auto-delete feature is enabled in the repo settings`,
      error
    );
  }
}
