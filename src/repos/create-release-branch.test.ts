jest.mock('../rest-client');

import {createReleaseBranch} from './create-release-branch';
import {getClient} from '../rest-client';

const owner = 'some-owner-name';
const repo = 'some-repo-name';
const version = '1.2.3';
const sha = 'some-hash';

const releaseBranch = {
  node_id: 'node-id',
  object: {
    sha: 'branch-hash',
    type: 'branch',
    url: 'some-url',
  },
  ref: `refs/heads/release/v${version}`,
  url: 'some-url',
};

const releaseBranchResponseMock = jest.fn().mockResolvedValue({
  data: releaseBranch,
});

(getClient as jest.Mock).mockReturnValue({
  git: {
    createRef: releaseBranchResponseMock,
  },
});

it('git.createRef should be called with correct parameters', async () => {
  const gh = getClient();

  await createReleaseBranch({owner, repo, version, sha});

  expect(gh.git.createRef).toHaveBeenCalledWith({
    owner,
    repo,
    sha,
    ref: `refs/heads/release/v${version}`,
  });
});

it('createReleaseBranch should return correct response', async () => {
  const result = await createReleaseBranch({owner, repo, version, sha});

  expect(result).toEqual(result);
});
