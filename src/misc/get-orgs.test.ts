jest.mock('../rest-client');

import {getClient} from '../rest-client';
import {getUserOrgs} from './get-orgs';

const listForAuthenticatedUserMock = jest
  .fn()
  .mockResolvedValue({data: [{login: 'hello'}, {login: 'world'}]});

const getAuthenticatedMock = jest.fn().mockResolvedValue({data: {login: 'x-username', id: 12345}});

jest.mocked(getClient).mockReturnValue({
  orgs: {listForAuthenticatedUser: listForAuthenticatedUserMock},
  users: {getAuthenticated: getAuthenticatedMock},
});

describe('getUserOrgs', () => {
  it('should call proper sdk method', async () => {
    await getUserOrgs();

    expect(listForAuthenticatedUserMock).toHaveBeenCalled();
  });

  it('should respond w/ sdk response', async () => {
    const resp = await getUserOrgs();

    expect(resp).toEqual(['hello', 'world', 'x-username']);
  });
});
