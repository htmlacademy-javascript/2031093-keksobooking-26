import {
  getRandomIntegerNumber
  , getRandomRealNumber
  , getRandomArrayItem
  , getRandomArrayItemsCollection
} from './utils.js';

const TEST_DATA_SIZE = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DECIMAL_PLACES_QTY = 4;
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const MIN_ROOMS_QTY = 0;
const MAX_ROOMS_QTY = 3;
const MIN_GUESTS_QTY = 0;
const MAX_GUESTS_QTY = 3;

const APARTMENTS_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getAvatarNumberString = (number) => {
  let numberString = number.toString();
  numberString = numberString.length > 1 ? numberString : `0${numberString}`;

  return numberString;
};

const generateAuthor = (avatarNumber) => ({
  avatar: `img/avatars/user${getAvatarNumberString(avatarNumber)}.png`,
});

const generateOffer = (id, location) => {
  const price = getRandomIntegerNumber(MIN_PRICE, MAX_PRICE);
  const type = getRandomArrayItem(APARTMENTS_TYPE);
  let rooms = getRandomIntegerNumber(MIN_ROOMS_QTY, MAX_ROOMS_QTY);
  rooms = rooms ? rooms : 100;
  const features = getRandomArrayItemsCollection(FEATURES);
  const description = `Best ${type} you've ever seen. It has ${rooms} rooms. Offer includes ${features.join(', ')}. And only today at low price ${price}₽ per night`;

  return {
    title: `Offer #${id}`,
    address: `{${location.lat}, ${location.lng}}`,
    price,
    type,
    rooms,
    guests: getRandomIntegerNumber(MIN_GUESTS_QTY, MAX_GUESTS_QTY),
    checkin: getRandomArrayItem(TIMES),
    checkout: getRandomArrayItem(TIMES),
    features,
    description,
    photos: getRandomArrayItemsCollection(PHOTOS),
  };
};

const generatetLocation = () => ({
  lat: getRandomRealNumber(MIN_LAT, MAX_LAT, DECIMAL_PLACES_QTY),
  lng: getRandomRealNumber(MIN_LNG, MAX_LNG, DECIMAL_PLACES_QTY),
});

const generateAd = (stub, index) => {
  const location = generatetLocation();
  const ad = {
    author: generateAuthor(index + 1),
    offer: generateOffer(index + 1, location),
    location: location,
  };

  return ad;
};

const generateData = () => Array.from({length: TEST_DATA_SIZE}, generateAd);

export {
  generateData
};
