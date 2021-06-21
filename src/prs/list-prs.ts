import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods';
import {all, paginate} from 'paginate-generator';
import {getClient} from '../rest-client';

interface ListOpenPRsParams {
  owner: string;
  searchText?: string;
}

interface ListPRsParams {
  owner: string;
  searchText?: string;
  prStatus: 'open' | 'closed';
}

export async function listPrs(params: ListOpenPRsParams): ReturnType<typeof listPRs> {
  return listPRs({...params, prStatus: 'open'});
}

export async function listClosedPRs(params: ListOpenPRsParams): ReturnType<typeof listPRs> {
  return listPRs({...params, prStatus: 'closed'});
}

async function listPRs(
  params: ListPRsParams
): Promise<
  RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items']
> {
  const prs: unknown[] = await all(
    paginate(async (token?: number) => {
      if ((token || 1) >= 11) {
        return {
          page: [],
        };
      }

      const gh = getClient();

      const {data} = await gh.search.issuesAndPullRequests({
        per_page: 100,
        page: token || 1,
        q: `is:${params.prStatus} is:pr archived:false user:${params.owner} ${
          params.searchText || ''
        }`,
      });

      return {
        next: data.items.length >= 100 ? (token || 1) + 1 : undefined,
        page: data.items,
      };
    })
  );

  return prs as RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items'];
}
