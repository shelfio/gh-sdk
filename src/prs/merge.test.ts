jest.mock('../rest-client');

import {getClient} from '../rest-client';
import {mergePR} from './merge';

const mergeMock = jest.fn().mockResolvedValue({data: {a: 1}});

jest.mocked<any>(getClient).mockReturnValue({
  pulls: {
    merge: mergeMock,
  },
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
