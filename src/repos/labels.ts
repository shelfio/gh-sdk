import {getClient} from '../rest-client';

export async function getRepoLabels(owner: string, repo: string): Promise<string[]> {
  const client = getClient();

  const {data} = await client.issues.listLabelsForRepo({
    owner,
    repo,
  });

  return data.map(l => l.name);
}

export async function createReleaseLabel(owner: string, repo: string): Promise<void> {
  const client = getClient();

  try {
    await client.issues.createLabel({owner, repo, name: 'release', color: 'ff0000'});
  } catch (error) {
    if (error.errors.some(e => e.code === 'already_exists')) {
      return;
    }

    throw error;
  }
}

export async function assignReleaseLabelToPR(
  owner: string,
  repo: string,
  pull_number: number
): Promise<void> {
  const client = getClient();

  await client.issues.addLabels({
    owner,
    repo,
    issue_number: pull_number,
    labels: ['release'],
  });
}
