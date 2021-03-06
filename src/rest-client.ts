import {Octokit} from '@octokit/rest';

let client: Octokit;

export function getClient(): Octokit {
  if (client) {
    return client;
  }

  client = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  return client;
}
