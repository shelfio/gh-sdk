jest.mock('../rest-client');

import {getClient} from '../rest-client.js';
import {approvePR} from './approve.js';

const createReviewMock = jest.fn().mockResolvedValue({data: {a: 1}});

jest.mocked<any>(getClient).mockReturnValue({
  pulls: {
    createReview: createReviewMock,
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
