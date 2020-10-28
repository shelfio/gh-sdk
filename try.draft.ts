import {createReleaseLabel} from './src/repos/labels';

(async () => {
  console.log(await createReleaseLabel('shelfio', 'shelf-api-accounts'));
})();
