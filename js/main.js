import {
  setPageToInactive
} from './form.js';

import {
  renderMap,
  setSimilarAdsToMap
} from './map.js';

import {
  getData
} from './api.js';

import {
  showMapPinsAlert
} from './utils.js';

setPageToInactive();
renderMap(() => { getData(setSimilarAdsToMap, showMapPinsAlert); });
