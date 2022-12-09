/* eslint-disable camelcase */
import {getClient} from '../rest-client';

export async function getRepoMergeStrategies(owner: string, repo: string) {
  const gh = getClient();

  const {
    data: {allow_merge_commit, allow_squash_merge, allow_rebase_merge},
  } = await gh.repos.get({
    owner,
    repo,
  });

  return {
    allowMergeCommit: allow_merge_commit,
    allowSquashMerge: allow_squash_merge,
    allowRebaseMerge: allow_rebase_merge,
  };
}
