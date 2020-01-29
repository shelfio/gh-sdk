import Oktokit from '@octokit/rest';

let client;

export function getClient(): Oktokit {
  if (client) {
    return client;
  }

  client = new Oktokit({
    auth: process.env.GITHUB_TOKEN
  });

  return client;
}
