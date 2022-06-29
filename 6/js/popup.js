import {
  generateData
} from './test-data.js';
import {
  getRandomIntegerNumber
} from './utils.js';

const APARTMENTS_DESCRIPTION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const setCardFeatures = (card, features) => {
  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.children;
  const isNotNecessary = (featureElement) => !features.some(
    (feature) => featureElement.classList.contains(`popup__feature--${feature}`));
  Array.from(featureList).filter(isNotNecessary).forEach((element) => element.remove());
};

const setCardPhotos = (card, photos) => {
  const photosContainer = card.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');

  photosContainer.innerHTML = '';
  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = photo;
    photosContainer.append(photoElement);
  });
};

const bookingMap = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const offersList = document.createDocumentFragment();

const ads = generateData();

ads.forEach(({author, offer}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;

  card.querySelector('.popup__title').innerHTML = offer.title;
  card.querySelector('.popup__text--address').innerHTML = offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').innerHTML = APARTMENTS_DESCRIPTION[offer.type];
  card.querySelector('.popup__text--capacity').innerHTML = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').innerHTML = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__description').innerHTML = offer.description;

  setCardFeatures(card, offer.features);
  setCardPhotos(card, offer.photos);

  offersList.append(card);
});

bookingMap.append(offersList.children[getRandomIntegerNumber(0, offersList.children.length)]);
