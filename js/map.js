import {
  setPageToActive
  , setAddress
  , formAdElement
} from './form.js';

import {
  generateData
} from './test-data.js';

import {
  getPopup
} from './popup.js';

const mantissaLength = 5;
const initialMapScale = 16;
const centerOfTokyoCoordinates = {
  lat: 35.69771374623864,
  lng: 139.7730618400656,
};
const testAds = generateData();

const map = L.map('map-canvas')
  .on('load', () => {
    const lat = centerOfTokyoCoordinates.lat.toFixed(mantissaLength);
    const lng = centerOfTokyoCoordinates.lng.toFixed(mantissaLength);

    setPageToActive();
    setAddress(`${lat}, ${lng}`);
  })
  .setView(centerOfTokyoCoordinates, initialMapScale);

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

testAds.forEach((ad) => {
  createMarker(ad);
});

mainPinMarker.on('move', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(mantissaLength);
  const lng = latLng.lng.toFixed(mantissaLength);

  setAddress(`${lat}, ${lng}`);
});

const resetMap = () => {
  mainPinMarker.setLatLng(centerOfTokyoCoordinates);
  map.setView(centerOfTokyoCoordinates, initialMapScale);
};

formAdElement.addEventListener('reset', () => {
  setTimeout(() => {
    resetMap();
  }, 100);
});
