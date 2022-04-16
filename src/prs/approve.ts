import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

type ApprovePRParams = {
  owner: string;
  repo: string;
  pr: number;
};

export async function approvePR(
  params: ApprovePRParams
): Promise<RestEndpointMethodTypes['pulls']['createReview']['response']['data']> {
  const gh = getClient();

  const {data} = await gh.pulls.createReview({
    owner: params.owner,
    repo: params.repo,
    event: 'APPROVE',
    pull_number: params.pr,
  });

  return data;
}
