import Octokit from '@octokit/rest';
import {getClient} from '../rest-client';

interface ListPRsParams {
  owner: string;
  searchText?: string;
}

export async function listOpenPRs(
  params: ListPRsParams
): Promise<Octokit.SearchIssuesAndPullRequestsResponseItemsItem[]> {
  const prs: unknown[] = [];
  let page = 1;
  let totalCount = 0;

  do {
    const data = await search({
      page,
      q: `is:open is:pr archived:false user:${params.owner} ${params.searchText || ''}`.trim()
    });

    totalCount = data.total_count;
    prs.push(...data.items);

    page++;
  } while (prs.length < totalCount);

  return prs as Octokit.SearchIssuesAndPullRequestsResponseItemsItem[];
}

async function search({
  q,
  page
}: {
  q: string;
  page: number;
}): Promise<Octokit.SearchIssuesAndPullRequestsResponse> {
  const gh = getClient();

  const {data} = await gh.search.issuesAndPullRequests({
    per_page: 100,
    page,
    q
  });

  return data;
}
