# gh-sdk [![CircleCI](https://circleci.com/gh/shelfio/gh-sdk/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/gh-sdk/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> Convenient wrapper for GitHub API for automation tasks

## Install

```
$ yarn add @shelf/gh-sdk
```

## Usage

```js
const {approvePR, mergePR, listPrs, getUserOrgs, ...} = require('@shelf/gh-sdk');

getUserOrgs();
listOrgRepos('shelf');                                      // => [, {repo}]
approvePR({owner: 'shelf', repo: 'api', pr: 3});
getPR({owner: 'shelf', repo: 'api', pr: 3});
mergePR({owner: 'shelf', repo: 'api', pr: 3});
listPrs({owner: 'shelf', searchText: 'renovate'});
listClosedPRs({owner: 'shelf', searchText: 'renovate'});
getRepoBranch({owner: 'shelf', repo: 'api', branch: 'dev'});
getRepoBranches({owner: 'shelf', repo: 'api'});            // => [, {branch}]
getRepoBranchesNames({owner: 'shelf', repo: 'api'});       // => [, 'branch-ref']
deleteBranch({owner: 'shelf', repo: 'api', ref: 'dev'});
createReleaseBranch({owner:'shelf', repo: 'api', version: '1.2.3', sha: 'dev'})  // => ref 'refs/heads/release/v1.2.3` (refs/heads - for git link)
createReleasePR({owner:'shelf', repo: 'api', version: '1.2.3', releaseTitle: 'Good stuff'})  //=> ref: 'release/v1.2.3`, title: Release v1.2.3: Good stuff
getLatestBranchCommit({owner: 'shelf', repo: 'api', branch: 'dev'});
getLatestDevelopCommit({owner: 'shelf', repo: 'api'})      //{branch: 'develop} as default
getLatestDevelopCommitSHA({owner: 'shelf', repo: 'api'})   // => 'develop-branch-hash-string'
getRepoLabels('shelf', 'api');
createReleaseLabel('shelf', 'api');
assignReleaseLabelToPR('shelf', 'api', 134);
extractRepoNameFromURL('https://github.com/shelfio/gh-sdk/pulls/5'); // => gh-sdk
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
