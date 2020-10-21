import {PullsGetResponseData} from '@octokit/types';
import {getClient} from '../rest-client';

export async function getPR({
  repo,
  owner,
  pull_number
}: {
  repo: string;
  owner: string;
  pull_number: number;
}): Promise<PullsGetResponseData> {
  const client = getClient();

  const {data} = await client.pulls.get({repo, owner, pull_number});

  return data;
}
