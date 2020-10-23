import {PullsGetResponseData} from '@octokit/types';
import {getClient} from '../rest-client';

export async function getPR({
  repo,
  owner,
  pr
}: {
  repo: string;
  owner: string;
  pr: number;
}): Promise<PullsGetResponseData> {
  const client = getClient();

  const {data} = await client.pulls.get({repo, owner, pull_number: pr});

  return data;
}
