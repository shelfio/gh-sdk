jest.mock('./rest-client');

import {getClient} from './rest-client';
import {approvePR, mergePR} from './index';

const createReviewMock = jest.fn().mockResolvedValue({data: {a: 1}});
const mergeMock = jest.fn().mockResolvedValue({data: {a: 1}});

(getClient as jest.Mock).mockReturnValue({
  pulls: {
    createReview: createReviewMock,
    merge: mergeMock
  }
});

describe('approvePR', () => {
  it('should call proper sdk method', async () => {
    await approvePR({owner: 'shelfio', repo: 'test', pr: 3});

    expect(createReviewMock).toHaveBeenCalledWith({
      event: 'APPROVE',
      owner: 'shelfio',
      pull_number: 3,
      repo: 'test'
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
      repo: 'test'
    });
  });

  it('should respond w/ sdk response', async () => {
    const resp = await mergePR({owner: 'shelfio', repo: 'test', pr: 3});

    expect(resp).toEqual({a: 1});
  });
});
