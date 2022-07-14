import {
  setPageToActive
  , setAddress
  , formAdElement
} from './form.js';

const mantissaLength = 5;
const centerOfTokyoCoordinates = {
  lat: 35.69771374623864,
  lng: 139.7730618400656,
};

const map = L.map('map-canvas')
  .on('load', () => {
    const lat = centerOfTokyoCoordinates.lat.toFixed(mantissaLength);
    const lng = centerOfTokyoCoordinates.lng.toFixed(mantissaLength);

    setPageToActive();
    setAddress(`${lat}, ${lng}`);
  })
  .setView(centerOfTokyoCoordinates, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// const otherPinIcon = L.icon({
//   iconUrl: './img/pin.svg',
//   iconSize: [52, 52],
//   iconAnchor: [26, 52],
// });

const mainPinMarker = L.marker(centerOfTokyoCoordinates, {
  draggable: true,
  icon: mainPinIcon,
}).addTo(map);

mainPinMarker.on('move', (evt) => {
  const latLng = evt.target.getLatLng();
  const lat = latLng.lat.toFixed(mantissaLength);
  const lng = latLng.lng.toFixed(mantissaLength);

  setAddress(`${lat}, ${lng}`);
});

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng(centerOfTokyoCoordinates);
};

formAdElement.addEventListener('reset', () => {
  setTimeout(() => {
    resetMainPinMarker();
  }, 100);
});
