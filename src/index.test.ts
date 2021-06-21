jest.mock('./rest-client');

import {getClient} from './rest-client';
import {approvePR, getUserOrgs, mergePR} from './index';

const createReviewMock = jest.fn().mockResolvedValue({data: {a: 1}});
const mergeMock = jest.fn().mockResolvedValue({data: {a: 1}});
const listForAuthenticatedUserMock = jest
  .fn()
  .mockResolvedValue({data: [{login: 'hello'}, {login: 'world'}]});

(getClient as jest.Mock).mockReturnValue({
  pulls: {
    createReview: createReviewMock,
    merge: mergeMock,
  },
  orgs: {
    listForAuthenticatedUser: listForAuthenticatedUserMock,
  },
});

describe('approvePR', () => {
  it('should call proper sdk method', async () => {
    await approvePR({owner: 'shelfio', repo: 'test', pr: 3});

    expect(createReviewMock).toHaveBeenCalledWith({
      event: 'APPROVE',
      owner: 'shelfio',
      pull_number: 3,
      repo: 'test',
    });
  });

  it('should respond w/ sdk response', async () => {
    const resp = await approvePR({owner: 'shelfio', repo: 'test', pr: 3});

    expect(resp).toEqual({a: 1});
  });
});

describe('mergePR', () => {
  it('should call proper sdk method', async () => {
    await mergePR({owner: 'shelfio', repo: 'test', pr: 3});

    expect(mergeMock).toHaveBeenCalledWith({
      merge_method: 'merge',
      owner: 'shelfio',
      pull_number: 3,
      repo: 'test',
    });
  });

  it('should respond w/ sdk response', async () => {
    const resp = await mergePR({owner: 'shelfio', repo: 'test', pr: 3});

    expect(resp).toEqual({a: 1});
  });
});

describe('getUserOrgs', () => {
  it('should call proper sdk method', async () => {
    await getUserOrgs();

    expect(listForAuthenticatedUserMock).toHaveBeenCalled();
  });

  it('should respond w/ sdk response', async () => {
    const resp = await getUserOrgs();

    expect(resp).toEqual(['hello', 'world']);
  });
});
