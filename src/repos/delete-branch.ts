import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

export async function deleteBranch({
  owner,
  repo,
  ref,
}: RestEndpointMethodTypes['git']['deleteRef']['parameters']): Promise<
  RestEndpointMethodTypes['git']['deleteRef']['response']['data'] | undefined
> {
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
