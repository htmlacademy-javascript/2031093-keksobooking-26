import {
  setPageToActive
  , setAddress
  , formAdElement
} from './form.js';

import {
  getData
} from './api.js';

import {
  getPopup
} from './popup.js';

import {
  getRandomIntegerNumber
  , showMapPinsAlert
} from './utils.js';

const DECIMAL_MANTISSA_LENGTH = 5;
const INITIAL_MAP_SCALE = 16;
const MAX_ADS_QUANTITY = 10;
const centerOfTokyoCoordinates = {
  lat: 35.69771374623864,
  lng: 139.7730618400656,
};

const map = L.map('map-canvas')
  .on('load', () => {
    const lat = centerOfTokyoCoordinates.lat.toFixed(DECIMAL_MANTISSA_LENGTH);
    const lng = centerOfTokyoCoordinates.lng.toFixed(DECIMAL_MANTISSA_LENGTH);

    setPageToActive();
    setAddress(`${lat}, ${lng}`);
  })
  .setView(centerOfTokyoCoordinates, INITIAL_MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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
}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  L.marker(ad.location, {
    draggable: false,
    icon: otherPinIcon,
  })
    .addTo(markerGroup)
    .bindPopup(getPopup(ad));
};

getData(
  (similarAds) => {
    const firstAdNumber = getRandomIntegerNumber(0, similarAds.length - MAX_ADS_QUANTITY);

    similarAds
      .slice(firstAdNumber, firstAdNumber + MAX_ADS_QUANTITY)
      .forEach((ad) => {
        createMarker(ad);
      });
  },
  showMapPinsAlert
);

mainPinMarker.on('move', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(DECIMAL_MANTISSA_LENGTH);
  const lng = latLng.lng.toFixed(DECIMAL_MANTISSA_LENGTH);

  setAddress(`${lat}, ${lng}`);
});

const resetMap = () => {
  mainPinMarker.setLatLng(centerOfTokyoCoordinates);
  map.setView(centerOfTokyoCoordinates, INITIAL_MAP_SCALE);
  map.closePopup();
};

formAdElement.addEventListener('reset', () => {
  setTimeout(() => {
    resetMap();
  }, 100);
});
