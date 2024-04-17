jest.mock('../rest-client');

import {getClient} from '../rest-client.js';
import {
  getLatestBranchCommit,
  getLatestDevelopCommit,
  getLatestDevelopCommitSHA,
} from './get-latest-branch-commit.js';

const commit = {
  author: {id: 123, login: 'some-login-string', url: 'some-author-url'},
  committer: {id: 123, login: 'some-login-string', url: 'some-commiter-string'},
  parents: [
    {
      sha: 'some-parent-hash',
      url: 'some-parent-url',
    },
  ],
  node_id: 'some-node-id',
  sha: 'some-commit-hash',
  url: 'some-commit-url',
};

const branchResponse = {
  commit,
  name: 'some-branch-name',
  protected: false,
  protection: {enabled: false},
  protection_url: 'some-protection-url',
};

const branchMock = jest.fn().mockResolvedValue({
  data: branchResponse,
});

jest.mocked<any>(getClient).mockReturnValue({
  repos: {
    getBranch: branchMock,
  },
});

beforeAll(() => {
  getClient();
});

const owner = 'some-owner-name';
const repo = 'some-repo-name';
const branch = 'some-branch-name';

it('getLastBranchCommit should return correct result', async () => {
  const result = await getLatestBranchCommit({owner, repo, branch});

  expect(result).toEqual(commit);
});

it('getLastDevelopCommit should return correct result', async () => {
  const result = await getLatestDevelopCommit({owner, repo});

  expect(result).toEqual(commit);
});

it('getLastDevelopCommitSHA should return correct result', async () => {
  const result = await getLatestDevelopCommitSHA({owner, repo});

  expect(result).toEqual(commit.sha);
});
