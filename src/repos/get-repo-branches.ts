import {map} from 'lodash';
import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {ReposGetBranchResponseData, ReposListBranchesResponseData} from '@octokit/types';
import {getClient} from '../rest-client';

export async function getRepoBranch({
  owner,
  repo,
  branch
}: RestEndpointMethodTypes['repos']['getBranch']['parameters']): Promise<
  ReposGetBranchResponseData
> {
  const gh = getClient();
  const branchResponse = await gh.repos.getBranch({
    owner,
    repo,
    branch
  });

  return branchResponse.data;
}

export async function getRepoBranches({
  owner,
  repo
}: RestEndpointMethodTypes['repos']['listBranches']['parameters']): Promise<
  ReposListBranchesResponseData
> {
  const gh = getClient();

  const branchesResponse = await gh.repos.listBranches({
    owner,
    repo,
    per_page: 100
  });

  return branchesResponse.data;
}

export async function getRepoBranchesNames({
  owner,
  repo
}: {
  owner: string;
  repo: string;
}): Promise<string[]> {
  const branchesResponse = await getRepoBranches({owner, repo});

  return map(branchesResponse, 'name');
}
