/* eslint-disable camelcase */
import {getClient} from '../rest-client';

type UpdateRepoMergeStrategiesParams = {
  owner: string;
  repo: string;
  allowMergeCommits: boolean;
  allowSquash: boolean;
  allowRebase: boolean;
};

export async function updateRepoMergeStrategies(params: UpdateRepoMergeStrategiesParams) {
  const gh = getClient();
  const {owner, repo, allowMergeCommits, allowSquash, allowRebase} = params;

  await gh.repos.update({
    owner,
    repo,
    allow_merge_commit: allowMergeCommits,
    allow_squash_merge: allowSquash,
    allow_rebase_merge: allowRebase,
  });
}
