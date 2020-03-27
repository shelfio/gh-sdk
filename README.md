# gh-sdk [![CircleCI](https://circleci.com/gh/shelfio/gh-sdk/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/gh-sdk/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> Convenient wrapper for GitHub API for automation tasks

## Install

```
$ yarn add @shelf/gh-sdk
```

## Usage

```js
const {approvePR, mergePR, listOpenPRs, getUserOrgs, ...} = require('@shelf/gh-sdk');

getUserOrgs();
listOrgRepos('shelf');                                      // => [, {repo}]
approvePR({owner: 'shelf', repo: 'api', pr: 3});
mergePR({owner: 'shelf', repo: 'api', pr: 3});
listOpenPRs({owner: 'shelf', searchText: 'renovate'});
getRepoBranch({owner: 'shelf', repo: 'api', branch: 'dev'});
getRepoBranches({owner: 'shelf', repo: 'api'});            // => [, {branch}]
getRepoBranchesNames({owner: 'shelf', repo: 'api'});       // => [, 'branch-ref']
deleteBranch({owner: 'shelf', repo: 'api', ref: 'dev'});
createReleaseBranch({owner:'shelf', repo: 'api', version: '1.2.3', sha: 'dev'})  // => ref 'release/v1.2.3`
createReleasePR({owner:'shelf', repo: 'api', version: '1.2.3', releaseTitle: 'Good stuff'})  //=> ref: 'release/v1.2.3`, title: Release v1.2.3: Good stuff
getLatestBranchCommit({owner: 'shelf', repo: 'api', branch: 'dev'});
getLatestDevelopCommit({owner: 'shelf', repo: 'api'})      //{branch: 'develop} as default
getLatestDevelopCommitSHA({owner: 'shelf', repo: 'api'})   // => 'develop-branch-hash-string'
```

## Publish

```sh
$ yarn version
$ yarn publish
```

## License

MIT © [Shelf](https://shelf.io)
