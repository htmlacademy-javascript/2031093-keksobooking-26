const TEST_DATA_SIZE = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DECIMAL_PLACES_QTY = 4;
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const MIN_ROOMS_QTY = 1;
const MAX_ROOMS_QTY = 10;
const MIN_GUESTS_QTY = 1;
const MAX_GUESTS_QTY = 6;

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

const randomizerParametersAreCorrect = (min, max, functionErrorString) => {
  if (max === undefined) {
    throw new Error(`${functionErrorString} There are must be two number parameters.`);
  } else if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) {
    throw new Error(`${functionErrorString}  Parameters "min" and "max" must be numbers greater or equal to zero.`);
  } else if (min > max || min === max) {
    throw new Error(`${functionErrorString} Parameter "min" must be less then parameter "max".`);
  }

  return true;
};

const getRandomNumber = (min, max, tail, functionError) => {
  const pow = Math.pow(10, tail);
  let result = null;

  if (!randomizerParametersAreCorrect(min, max, functionError)) {
    result = null;
  } else {
    result = Math.round((Math.random() * (max - min) + min) * pow) / pow;
  }

  return result;
};

const getRandomIntegerNumber = (min, max) => {
  const functionError = 'getRandomInteger function error!';

  return getRandomNumber(min, max, 0, functionError);
};

const getRandomRealNumber = (min, max, tail) => {
  const functionError = 'getRandomRealNumber function error!';

  return getRandomNumber(min, max, tail, functionError);
};

const getAvatarNumberString = (number) => {
  let numberString = number.toString();
  numberString = numberString.length > 1 ? numberString : `0${numberString}`;

  return numberString;
};

const generateAuthor = (avatarNumber) => ({
  avatar: `img/avatars/user${getAvatarNumberString(avatarNumber)}.png`,
});

const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

const getRandomArrayItemsCollection = (array) => {
  const itemsQty = getRandomIntegerNumber(1, array.length);
  const items = [];

  while (items.length < itemsQty) {
    const item = getRandomArrayItem(array);
    if (!items.includes(item)) {
      items.push(item);
    }

  }

  return items;
};

const generateOffer = (id, location) => {
  const price = getRandomIntegerNumber(MIN_PRICE, MAX_PRICE);
  const type = getRandomArrayItem(APARTMENTS_TYPE);
  const rooms = getRandomIntegerNumber(MIN_ROOMS_QTY, MAX_ROOMS_QTY);
  const features = getRandomArrayItemsCollection(FEATURES);
  const description = `Best ${type} you've ever seen. It has ${rooms} rooms. Offer includes ${features.join(', ')}. And only today at low price $${price}`;

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

{//TEST. TODO delete before release
  getRandomRealNumber(77.7, 888.8, 4);
  getRandomIntegerNumber(77, 78);
  // eslint-disable-next-line no-console
  /**/console.log(generateData());
}
