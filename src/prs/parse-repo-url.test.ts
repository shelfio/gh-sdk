import {extractRepoNameFromURL} from './parse-repo-url';

it('should parse API repo url', () => {
  const repoName = extractRepoNameFromURL('https://api.github.com/repos/shelfio/gh-sdk');

  expect(repoName).toEqual('gh-sdk');
});

it('should parse UI repo url', () => {
  const repoName = extractRepoNameFromURL('https://github.com/shelfio/gh-sdk');

  expect(repoName).toEqual('gh-sdk');
});

it('should parse UI PR url', () => {
  const repoName = extractRepoNameFromURL('https://github.com/shelfio/gh-sdk/pulls/5');

  expect(repoName).toEqual('gh-sdk');
});
