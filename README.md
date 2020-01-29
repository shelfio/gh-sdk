# gh-sdk [![CircleCI](https://circleci.com/gh/shelfio/gh-sdk/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/gh-sdk/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> Convenient wrapper for GitHub API for automation tasks

## Install

```
$ yarn add @shelf/gh-sdk
```

## Usage

```js
const {approvePR, mergePR, listOpenPRs, getUserOrgs, listOrgRepos} = require('@shelf/gh-sdk');

approvePR({owner: 'shelf', repo: 'api', pr: 3});
mergePR({owner: 'shelf', repo: 'api', pr: 3});
listOpenPRs({owner: 'shelf', searchText: 'renovate'});
getUserOrgs();
listOrgRepos('shelf');
```

## License

MIT © [Shelf](https://shelf.io)
