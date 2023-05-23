# gh-sdk [![CircleCI](https://circleci.com/gh/shelfio/gh-sdk/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/gh-sdk/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> Convenient wrapper for GitHub API for automation tasks

## Install

```
$ yarn add @shelf/gh-sdk
```

## Usage

```js
import { approvePR, mergePR, listPrs, getUserOrgs } from "@shelf/gh-sdk";

approvePR({ owner: "shelf", repo: "api", pr: 3 });
assignReleaseLabelToPR("shelf", "api", 134);
getRepoMergeStrategies("shelf", "api");
createReleaseBranch({ owner: "shelf", repo: "api", version: "1.2.3", sha: "dev" }); // => ref 'refs/heads/release/v1.2.3` (refs/heads - for git link)
createReleaseLabel("shelf", "api");
createReleasePR({ owner: "shelf", repo: "api", version: "1.2.3", releaseTitle: "Good stuff" }); // => ref: 'release/v1.2.3`, title: Release v1.2.3: Good stuff
deleteBranch({ owner: "shelf", repo: "api", ref: "dev" });
extractRepoNameFromURL("https://github.com/shelfio/gh-sdk/pulls/5"); // => gh-sdk
getLatestBranchCommit({ owner: "shelf", repo: "api", branch: "dev" });
getLatestDevelopCommit({ owner: "shelf", repo: "api" }); // {branch: 'develop} as default
getLatestDevelopCommitSHA({ owner: "shelf", repo: "api" }); // => 'develop-branch-hash-string'
getPR({ owner: "shelf", repo: "api", pr: 3 });
getRepoBranch({ owner: "shelf", repo: "api", branch: "dev" });
getRepoBranches({ owner: "shelf", repo: "api" }); // => [, {branch}]
getRepoBranchesNames({ owner: "shelf", repo: "api" }); // => [, 'branch-ref']
getRepoLabels("shelf", "api");
getUserOrgs();
listClosedPRs({ owner: "shelf", searchText: "renovate" });
listOrgRepos({ org: "shelfio", type: "sources", skipArchived: true }); // => [, {repo}]
listPrs({ owner: "shelf", searchText: "renovate" });
mergePR({ owner: "shelf", repo: "api", pr: 3 });
updateRepoMergeStrategies({
  owner: 'shelfio',
  repo: 'api',
  allowMergeCommits: false,
  allowSquash: false,
  allowRebase: true,
});
getOpenRepoPRsFromHuman('shelf', 'repo');
getCommitChecks('shelf', 'repo', 'sha');
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
