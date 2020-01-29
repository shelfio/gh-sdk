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
  let areResultsIncomplete = true;

  while (areResultsIncomplete) {
    const data = await search({
      page,
      q: `is:open is:pr archived:false user:${params.owner} ${params.searchText || ''}`.trim()
    });

    areResultsIncomplete = data.incomplete_results;

    prs.concat(data.items);

    page++;
  }

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
