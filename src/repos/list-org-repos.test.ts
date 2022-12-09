jest.mock('../rest-client');

import {getClient} from '../rest-client';
import {listOrgRepos} from './list-org-repos';

const listForOrgMock = jest.fn().mockResolvedValue({
  data: [{a: 1}],
});

jest.mocked<any>(getClient).mockReturnValue({
  repos: {
    listForOrg: listForOrgMock,
  },
});

it('should call sdk w/ proper params', async () => {
  await listOrgRepos({org: 'shelf'});

  expect(listForOrgMock).toHaveBeenCalledWith({
    direction: 'desc',
    org: 'shelf',
    page: 1,
    per_page: 100,
    sort: 'pushed',
    type: 'all',
  });
});

it('should return 1 org repo', async () => {
  const prs = await listOrgRepos({org: 'shelf'});

  expect(prs).toEqual([{a: 1}]);
});
