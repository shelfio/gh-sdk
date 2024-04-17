import {getClient} from '../rest-client.js';

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
}) {
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
