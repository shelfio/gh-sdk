import {Octokit} from '@octokit/rest';

let client;

export function getClient(): Octokit {
  if (client) {
    return client;
  }

  client = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  return client;
}
