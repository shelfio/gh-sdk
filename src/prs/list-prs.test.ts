jest.mock('../rest-client');

import {getClient} from '../rest-client';
import {listPrs} from './list-prs';

const issuesAndPullRequestsMock = jest
  .fn()
  .mockResolvedValue({data: {total_count: 2, items: [{a: 1}]}});

(getClient as jest.Mock).mockReturnValue({
  search: {
    issuesAndPullRequests: issuesAndPullRequestsMock,
  },
});

it('should call sdk w/ proper params for 2 pages', async () => {
  await listPrs({owner: 'shelf', searchText: 'hello'});

  expect(issuesAndPullRequestsMock).toHaveBeenCalledWith({
    page: 1,
    per_page: 100,
    q: 'is:open is:pr archived:false user:shelf hello',
  });
  expect(issuesAndPullRequestsMock).toHaveBeenCalledWith({
    page: 2,
    per_page: 100,
    q: 'is:open is:pr archived:false user:shelf hello',
  });
});

it('should return 2 open prs', async () => {
  const prs = await listPrs({owner: 'shelf', searchText: 'hello'});

  expect(prs).toEqual([{a: 1}, {a: 1}]);
});
