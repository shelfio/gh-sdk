import {Octokit} from '@octokit/rest';
import {getClient} from '../rest-client';

export async function deleteBranch({
  owner,
  repo,
  ref
}: Octokit.GitDeleteRefParams): Promise<Octokit.AnyResponse> {
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
