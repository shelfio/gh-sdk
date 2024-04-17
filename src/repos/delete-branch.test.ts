jest.mock('./delete-branch');

import {deleteBranch} from './delete-branch.js';

it('deleteBranch should be called w/ correct arguments', async () => {
  const owner = 'some-repo-owner';
  const repo = 'some-repo';
  const ref = 'some-branch-name';

  await deleteBranch({owner, repo, ref});

  expect(deleteBranch).toHaveBeenCalledWith({owner, repo, ref});
});
