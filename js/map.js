import {
  setAdFormToActive,
  setFilterFormToActive,
  setAddress,
  formAdElement
} from './form.js';

import {
  getData
} from './api.js';

import {
  getPopup
} from './popup.js';

import {
  getRandomIntegerNumber,
  showMapPinsAlert
} from './utils.js';

const DECIMAL_MANTISSA_LENGTH = 5;
const INITIAL_MAP_SCALE = 16;
const MAX_ADS_QUANTITY = 10;
const ANY = 'any';
const centerOfTokyoCoordinates = {
  lat: 35.69771374623864,
  lng: 139.7730618400656,
};
const priceFilterOption = {
  'any': [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
  'middle': [10000, 50000],
  'low': [Number.NEGATIVE_INFINITY, 10000],
  'high': [50000, Number.POSITIVE_INFINITY],
};
// const featureOption = {
//   wifi,
//   'dishwasher': ,
//   parking,  //'parking', 'wifi', 'washer', 'dishwasher', 'conditioner', 'elevator'
//   'washer': ,
//   'elevator': ,
//   'conditioner': ,
// };


const formFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');

const map = L.map('map-canvas');

const tileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const getPinIcon = (width, height, imgSrc) => ({
  iconUrl: imgSrc,
  iconSize: [width, height],
  iconAnchor: [width / 2, height],
});

const mainPinIcon = L.icon( getPinIcon(52, 52, './img/main-pin.svg') );

const otherPinIcon = L.icon( getPinIcon(40, 40, './img/pin.svg') );

const mainPinMarker = L.marker(centerOfTokyoCoordinates, {
  draggable: true,
  icon: mainPinIcon,
});

const markerGroup = L.layerGroup();

const createMarker = (ad) => {
  L.marker(ad.location, {
    draggable: false,
    icon: otherPinIcon,
  })
    .addTo(markerGroup)
    .bindPopup(getPopup(ad));
};

const renderAds = async (ads) => {
  map.closePopup();
  markerGroup.clearLayers();

  const firstAdNumber = (ads.length <= MAX_ADS_QUANTITY) ? 0 : getRandomIntegerNumber(0, ads.length - MAX_ADS_QUANTITY);

  ads
    .slice(firstAdNumber, firstAdNumber + MAX_ADS_QUANTITY)
    .forEach((ad) => {
      createMarker(ad);
    });
};

const isTypeMatchesToFilter = ({offer: {type}}, {value: filter}) => type && (filter === ANY || type === filter);

const isPriceMatchesToFilter = ({offer: {price}}, {value: filter}) => price &&
  (filter === ANY || price >= priceFilterOption[filter][0] && price < priceFilterOption[filter][1]);

const isRoomsMatchesToFilter = ({offer: {rooms}}, {value: filter}) => rooms && (filter === ANY || rooms === +filter);

const isGuestsMatchesToFilter = ({offer: {guests}}, {value: filter}) => (guests || !(+guests)) &&
  (filter === ANY || guests === +filter);




const setTypeFilterEvents = (similarAds) => {
  const filterFeaturesValue = [...housingFeaturesElement.querySelectorAll('[name="features"]')]
    .filter((item) => item.checked).map((item) => item.value);

  // console.log(similarAds.filter((ad) => ad.offer.features && ad.offer.features.length === 6));
  // console.log(similarAds.filter((ad) => !(ad.offer.features)));
  console.log(filterFeaturesValue.length + ' - ' + filterFeaturesValue);

  const typeMatches = (ad) => isTypeMatchesToFilter(ad, housingTypeElement);
  const priceMatches = (ad) => isPriceMatchesToFilter(ad, housingPriceElement);
  const roomsMatches = (ad) => isRoomsMatchesToFilter(ad, housingRoomsElement);
  const guestsMatches = (ad) => isGuestsMatchesToFilter(ad, housingGuestsElement);

  const featuresMatches = (ad) => !(filterFeaturesValue.length) || ad.offer.features &&
    ad.offer.features.map((f) => filterFeaturesValue.includes(f)).reduce((f1, f2) => f1 && f2, true);

  let sortedAds = similarAds
    .filter(typeMatches)
    .filter(priceMatches)
    .filter(roomsMatches)
    .filter(guestsMatches)
    // .filter(featuresMatches)
    ;
  console.log(sortedAds);

  sortedAds = sortedAds.filter((ad) => {
    console.log(featuresMatches(ad));
    return featuresMatches(ad)
  });
  console.log(sortedAds);

  renderAds(sortedAds);
};

const setMapFilterEvents = async (similarAds) => {
  formFiltersElement.addEventListener('change', () => setTypeFilterEvents(similarAds));
};

const setSimilarAdsToMap = async (similarAds) => {

  await renderAds(similarAds);
  await setMapFilterEvents(similarAds);

  setFilterFormToActive();
};

const resetMap = () => {
  mainPinMarker.setLatLng(centerOfTokyoCoordinates);
  map.setView(centerOfTokyoCoordinates, INITIAL_MAP_SCALE);
  map.closePopup();
};

map.on('load', () => {
  const lat = centerOfTokyoCoordinates.lat.toFixed(DECIMAL_MANTISSA_LENGTH);
  const lng = centerOfTokyoCoordinates.lng.toFixed(DECIMAL_MANTISSA_LENGTH);

  setAdFormToActive();
  setAddress(`${lat}, ${lng}`);
}).setView(centerOfTokyoCoordinates, INITIAL_MAP_SCALE);

mainPinMarker.on('move', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(DECIMAL_MANTISSA_LENGTH);
  const lng = latLng.lng.toFixed(DECIMAL_MANTISSA_LENGTH);

  setAddress(`${lat}, ${lng}`);
});

formAdElement.addEventListener('reset', () => {
  setTimeout(() => {
    resetMap();
  }, 100);
});

const renderMap = (callback) => {
  try {

    tileLayer.addTo(map);
    mainPinMarker.addTo(map);
    markerGroup.addTo(map);

    callback();

  } catch (error) {
    throw new Error(`${error.name}: ${error.message},
${error.stack}`);
  }
};

renderMap(() => {getData(setSimilarAdsToMap, showMapPinsAlert);});
