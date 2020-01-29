import Oktokit from '@octokit/rest';

let client;
const octokit = new Oktokit();

export function getClient(): Oktokit {
  if (client) {
    return client;
  }

  octokit.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });

  client = octokit;

  return client;
}
