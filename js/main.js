import {
  generateData
} from './test-data.js';

import {
  setPageToInactive
  , setPageToActive
} from './form.js';

{//TEST. TODO delete before release
  generateData();

  setPageToInactive();
  setPageToActive();
}
