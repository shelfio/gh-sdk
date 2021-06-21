jest.mock('../rest-client');

import {getRepoBranch, getRepoBranches, getRepoBranchesNames} from './get-repo-branches';
import {getClient} from '../rest-client';

const branchOne = {
  _links: {html: 'some-html'},
  name: 'some-branch-name-one',
};

const branchOTwo = {
  _links: {html: 'some-html'},
  name: 'some-branch-name-two',
};

const branchMock = jest.fn().mockResolvedValue({
  data: branchOne,
});

const branchesMock = jest.fn().mockResolvedValue({
  data: [branchOne, branchOTwo],
});

(getClient as jest.Mock).mockReturnValue({
  repos: {
    getBranch: branchMock,
    listBranches: branchesMock,
  },
});

const owner = 'some-onwer-name';
const repo = 'some-repo-name';

it('getRepoBranch should return correct response', async () => {
  const response = await getRepoBranch({owner, repo, branch: branchOne.name});

  expect(response).toEqual(branchOne);
});

it('getRepoBranches should return correct response', async () => {
  const response = await getRepoBranches({owner, repo});

  expect(response).toEqual([branchOne, branchOTwo]);
});

it('getRepoBranchesNames should return correct response', async () => {
  const response = await getRepoBranchesNames({owner, repo});

  expect(response).toEqual(['some-branch-name-one', 'some-branch-name-two']);
});
