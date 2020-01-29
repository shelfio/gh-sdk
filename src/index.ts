import Octokit from '@octokit/rest';
import {getClient} from './rest-client';

interface ApprovePRParams {
  owner: string;
  repo: string;
  pr: number;
}

export async function approvePR(
  params: ApprovePRParams
): Promise<Octokit.PullsCreateReviewResponse> {
  const gh = getClient();

  const {data} = await gh.pulls.createReview({
    owner: params.owner,
    repo: params.repo,
    event: 'APPROVE',
    pull_number: params.pr
  });

  return data;
}
