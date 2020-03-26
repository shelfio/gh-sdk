import {map} from 'lodash';
import path from 'path';
import {Octokit} from '@octokit/rest';
import {getClient} from '../rest-client';

export async function getRepoBranch({
  owner,
  repo,
  branch
}: Octokit.ReposGetBranchParams): Promise<Octokit.ReposGetBranchResponse> {
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
}: Octokit.ReposListBranchesParams): Promise<Octokit.ReposListBranchesResponse> {
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
