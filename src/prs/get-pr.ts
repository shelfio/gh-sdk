import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {getClient} from '../rest-client';

export async function getPR({
  repo,
  owner,
  pr,
}: {
  repo: string;
  owner: string;
  pr: number;
}): Promise<RestEndpointMethodTypes['pulls']['get']['response']['data']> {
  const client = getClient();

  const {data} = await client.pulls.get({repo, owner, pull_number: pr});

  return data;
}
