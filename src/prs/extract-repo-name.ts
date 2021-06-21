export function extractRepoNameFromURL(repoURL: string): string {
  try {
    return repoURL.split('repos/')[1].split('/')[1];
  } catch {
    return repoURL.split('github.com/')[1].split('/')[1];
  }
}
