import {Octokit} from '@octokit/rest';

export function getClient(): Octokit {
  return new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
}
