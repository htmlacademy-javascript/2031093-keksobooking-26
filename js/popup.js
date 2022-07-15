const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const APARTMENTS_DESCRIPTION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const setCardAvatar = (card, {avatar}) => {
  const avatarElement = card.querySelector('.popup__avatar');

  if (avatar) {
    avatarElement.src = avatar;
  } else {
    avatarElement.style.visibility = 'hidden';
  }
};

const setCardTitle = (card, {title}) => {
  const titleElement = card.querySelector('.popup__title');

  if (title) {
    titleElement.textContent = title;
  } else {
    titleElement.style.visibility = 'hidden';
  }
};

const setCardAddress = (card, {address}) => {
  const addressElement = card.querySelector('.popup__text--address');

  if (address) {
    addressElement.textContent = address;
  } else {
    addressElement.style.visibility = 'hidden';
  }
};

const setCardPrice = (card, {price}) => {
  const priceElement = card.querySelector('.popup__text--price');

  if (price) {
    priceElement.firstChild.textContent = `${price} `;
  } else {
    priceElement.style.visibility = 'hidden';
  }
};

const setCardType = (card, {type}) => {
  const typeElement = card.querySelector('.popup__type');

  if (type) {
    typeElement.textContent = APARTMENTS_DESCRIPTION[type];
  } else {
    typeElement.style.visibility = 'hidden';
  }
};

const setCardCapacity = (card, {rooms, guests}) => {
  const capacityElement = card.querySelector('.popup__text--capacity');

  const guestsDataExists = guests || !(+guests);

  const guestsData = guestsDataExists && guests ? `для ${guests} гостей` : 'не для гостей';

  if (rooms && guestsDataExists) {
    capacityElement.textContent = `${rooms} комнаты ${guestsData}`;
  } else if (rooms) {
    capacityElement.textContent = `${rooms} комнаты`;
  } else if (guestsDataExists) {
    capacityElement.textContent = guestsData.substring(0, 1).toUpperCase() + guestsData.substring(1);
  } else {
    capacityElement.style.visibility = 'hidden';
  }
};

const setCardTime = (card, {checkin, checkout}) => {
  const timeElement = card.querySelector('.popup__text--time');

  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin) {
    timeElement.textContent = `Заезд после ${checkin}`;
  } else if (checkout) {
    timeElement.textContent = `Выезд до ${checkout}`;
  } else {
    timeElement.style.visibility = 'hidden';
  }
};

const setCardFeatures = (card, {features}) => {
  const featureList = card.querySelector('.popup__features').children;
  let isNotNecessary;

  if (features.length) {
    isNotNecessary = (featureElement) => !features.some(
      (feature) => featureElement.classList.contains(`popup__feature--${feature}`));
  } else {
    isNotNecessary = () => true;
  }

  Array.from(featureList).filter(isNotNecessary).forEach((element) => element.remove());
};

const setCardDescription = (card, {description}) => {
  const descriptionElement = card.querySelector('.popup__description');

  if (description) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.style.visibility = 'hidden';
  }
};

const setCardPhotos = (card, {photos}) => {
  const photosContainer = card.querySelector('.popup__photos');

  if (photos.length) {
    const photoTemplate = photosContainer.querySelector('.popup__photo');

    photosContainer.innerHTML = '';
    photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photosContainer.append(photoElement);
    });

  } else {
    photosContainer.style.visibility = 'hidden';
  }
};

const getPopup = ({author, offer}) => {
  const card = cardTemplate.cloneNode(true);

  setCardAvatar(card, author);
  setCardTitle(card, offer);
  setCardAddress(card, offer);
  setCardPrice(card, offer);
  setCardType(card, offer);
  setCardCapacity(card, offer);
  setCardTime(card, offer);
  setCardFeatures(card, offer);
  setCardDescription(card, offer);
  setCardPhotos(card, offer);

  return card;
};

export {
  getPopup
};
