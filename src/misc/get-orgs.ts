import {getClient} from '../rest-client';

export async function getUserOrgs(): Promise<string[]> {
  const gh = getClient();
  const [{data: orgsData}, {data: currentUserData}] = await Promise.all([
    gh.orgs.listForAuthenticatedUser(),
    gh.users.getAuthenticated(),
  ]);
  console.log('orgsData', orgsData, 'currentUserData', currentUserData);

  const orgNames = orgsData.map(item => item.login);

  return [...orgNames, currentUserData.login].sort();
}
