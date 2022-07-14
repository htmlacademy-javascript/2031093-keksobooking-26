import {
  generateData
} from './test-data.js';

import {
  setPageToInactive
} from './form.js';

setPageToInactive();

{//TEST. TODO delete before release
  generateData();
}
