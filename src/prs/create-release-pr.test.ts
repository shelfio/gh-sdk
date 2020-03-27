jest.mock('../rest-client');

import {createReleasePR} from './create-release-pr';
import {getClient} from '../rest-client';

const owner = 'repo-owner-name';
const repo = 'some-repo-name';
const version = '1.2.3';
const releaseTitle = 'some-release-title';

const createPRResponse = {
  changed_files: 2,
  comments: 0,
  commits: 5,
  diff_url: 'some-diff-url',
  title: `Release v${version}: ${releaseTitle}`,
  url: 'some-pr-url',
  user: {id: 'some-user-id', url: 'some-user-url'}
};

const createPRResponseMock = jest.fn().mockResolvedValue({
  data: createPRResponse
});

(getClient as jest.Mock).mockReturnValue({
  pulls: {
    create: createPRResponseMock
  }
});

it('pulls.create should be call with correct parameters', async () => {
  await createReleasePR({owner, repo, version, releaseTitle});

  expect(getClient().pulls.create).toHaveBeenCalledWith({
    owner,
    repo,
    head: `release/v${version}`,
    base: 'master',
    title: `Release v${version}: ${releaseTitle}`
  });
});

it('createReleasePR should be return correct response', async () => {
  const result = await createReleasePR({owner, repo, version, releaseTitle});

  expect(result).toEqual(createPRResponse);
});
