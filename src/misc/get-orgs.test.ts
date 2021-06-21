jest.mock('../rest-client');

import {getUserOrgs} from './get-orgs';
import {getClient} from '../rest-client';

const listForAuthenticatedUserMock = jest
  .fn()
  .mockResolvedValue({data: [{login: 'hello'}, {login: 'world'}]});

(getClient as jest.Mock).mockReturnValue({
  orgs: {
    listForAuthenticatedUser: listForAuthenticatedUserMock,
  },
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
