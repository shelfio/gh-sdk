import {getClient} from '../rest-client';

export async function getUserOrgs(): Promise<string[]> {
  const gh = getClient();
  const {data} = await gh.orgs.listForAuthenticatedUser();
  const orgNames = data.map(item => item.login);

  return orgNames.sort();
}
