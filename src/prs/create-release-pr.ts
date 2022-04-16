import type {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';
import {getClient} from '../rest-client';

export async function createReleasePR({
  owner,
  repo,
  version,
  releaseTitle,
}: {
  owner: string;
  repo: string;
  version: string;
  releaseTitle: string;
}): Promise<RestEndpointMethodTypes['pulls']['create']['response']['data']> {
  const gh = getClient();
  const tagName = `v${version}`;
  const branch = `release/${tagName}`;

  const {data} = await gh.pulls.create({
    owner,
    repo,
    head: branch,
    base: 'master',
    title: `Release ${tagName}: ${releaseTitle}`,
  });

  return data;
}
