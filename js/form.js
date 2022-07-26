import {
  sendData
} from './api.js';

import {
  showAdFormAlert
} from './utils.js';

const MAX_PRICE = 100000;
const IMAGE_TYPE = 'image';
const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};
const priceOption = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const formFiltersElement = document.querySelector('.map__filters');
const formAdElement = document.querySelector('.ad-form');
const avatarSelectionElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview > img');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const addressElement = document.querySelector('#address');
const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const photoSelectionElement = document.querySelector('#images');
const photoPreviewElement = document.querySelector('.ad-form__photo');
const formSubmitButtonElement = document.querySelector('.ad-form__submit').closest('fieldset');

const pristine = new Pristine(formAdElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, true);

noUiSlider.create(sliderElement, {
  range: {
    min: +priceOption[typeElement.value],
    max: MAX_PRICE,
  },
  step: 1,
  start: +priceOption[typeElement.value],
  connect: 'lower',
  format: {
    to: function (value) {
      return (+value).toFixed(0);
    },
    from: function (value) {
      return (+value).toFixed(0);
    },
  },
});

const setFormToInactive = (element) => {
  element.classList.add('ad-form--disabled');
  [...element.children].forEach((child) => {
    child.disabled = true;
  });
};

const setFormToActive = (element) => {
  element.classList.remove('ad-form--disabled');
  [...element.children].forEach((child) => {
    child.disabled = false;
  });
};

const setPageToInactive = () => {
  setFormToInactive(formAdElement);
  setFormToInactive(formFiltersElement);
};

const setPageToActive = () => {
  setFormToActive(formFiltersElement);
  setFormToActive(formAdElement);
};

const setAddress = (address) => {
  addressElement.value = address;
};

const validateCapacity = () => capacityOption[roomNumberElement.value].includes(capacityElement.value);

const validatePrice = () => priceElement.value >= +priceOption[typeElement.value];

const getRoomNumberErrorMessage = () => {
  const selectedRoomNumberElement = roomNumberElement.querySelector(`[value="${roomNumberElement.value}"]`).textContent;

  return `${selectedRoomNumberElement} только`;
};

const getCapacityErrorMessage = () => {
  const capacities = [];

  for (const guestsQuantity of capacityOption[roomNumberElement.value]) {
    capacities.push(capacityElement.querySelector(`[value="${guestsQuantity}"]`).textContent);
  }

  return `${capacities.join(', ')}`;
};

const getPriceErrorMessage = () => `Минимальная цена ${priceOption[typeElement.value]}`;

const removeImages = () => {
  avatarSelectionElement.value = '';
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  photoSelectionElement.value = '';
  photoPreviewElement.innerHTML = '';
};

const resetPage = () => {
  formAdElement.reset();

  removeImages();

  formFiltersElement.reset();
};

const setAlertEventListeners = (alertElement) => {

  function onPopupEscKeydown(evt) {
    if (evt.key === 'Escape') {
      alertElement.remove();
      document.removeEventListener('click', onPopupClick);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  }

  function onPopupClick() {
    alertElement.remove();
    document.removeEventListener('click', onPopupClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const handleSendFormError = () => {
  const alertElement = showAdFormAlert('error');
  const alertCloseButtonElement = alertElement.querySelector('.error__button');

  setAlertEventListeners(alertElement);
  formSubmitButtonElement.disabled = false;

  alertCloseButtonElement.addEventListener('click', () => {
    alertElement.remove();
  });
};

const handleSendFormSuccess = () => {
  const alertElement = showAdFormAlert('success');

  resetPage();
  setAlertEventListeners(alertElement);
  formSubmitButtonElement.disabled = false;
};

const getNewImgElement = (src = '', alt = 'Фото', width = 100, height = 100) => {
  const img = document.createElement('img');

  img.src = src;
  img.alt = alt;
  img.style.maxWidth = `${width}px`;
  img.style.maxHeight = `${height}px`;
  img.style.aspectRatio = 'auto';

  return img;
};

const fileIsImage = (file) => file.type.startsWith(IMAGE_TYPE);

const onAvatarChange = () => {
  const file = avatarSelectionElement.files[0];

  if (fileIsImage(file)) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};

const onRoomsChange = () => {
  pristine.validate(capacityElement);
};

const onCapacityChange = () => {
  pristine.validate(roomNumberElement);
};

const onPriceChange = () => {
  const min = priceOption[typeElement.value];

  priceElement.min = min;
  priceElement.placeholder = min;
  priceElement.dataset.pristineMinMessage  = `Минимальная цена ${min}`;
  sliderElement.noUiSlider.set(+priceElement.value);

  pristine.validate(priceElement);
};

const onTypeChange = () => {
  onPriceChange();

  const min = +priceOption[typeElement.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max: MAX_PRICE,
    },
    step: 1,
    connect: 'lower',
  });

  if (!priceElement.value) {
    sliderElement.noUiSlider.set(min);
  }
};

const onTimeinChange = () => {
  timeoutElement.value = timeinElement.value;
};

const onTimeoutChange = () => {
  timeinElement.value = timeoutElement.value;
};

const onPhotoChange = () => {
  const file = photoSelectionElement.files[0];

  if (fileIsImage(file)) {
    const img = getNewImgElement(URL.createObjectURL(file), 'Фото квартиры', 70, 70);

    photoPreviewElement.innerHTML = '';
    photoPreviewElement.append(img);
  }
};

const onSliderChange = () => {
  priceElement.value = sliderElement.noUiSlider.get();
};

pristine.addValidator(roomNumberElement, validateCapacity, getRoomNumberErrorMessage);
pristine.addValidator(capacityElement, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

avatarSelectionElement.addEventListener('change', onAvatarChange);
roomNumberElement.addEventListener('change', onRoomsChange);
capacityElement.addEventListener('change', onCapacityChange);
typeElement.addEventListener('change', onTypeChange);
priceElement.addEventListener('input', onPriceChange);
timeinElement.addEventListener('change', onTimeinChange);
timeoutElement.addEventListener('change', onTimeoutChange);
photoSelectionElement.addEventListener('change', onPhotoChange);
sliderElement.noUiSlider.on('change', onSliderChange);
sliderElement.noUiSlider.on('slide', onSliderChange);

formAdElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    formSubmitButtonElement.disabled = true;
    const formData = new FormData(evt.target);
    sendData(handleSendFormSuccess, handleSendFormError, formData);

    formFiltersElement.reset();
  }
});

formAdElement.addEventListener('reset', () => {
  const basePrice = priceOption['flat'];

  priceElement.min = basePrice;
  priceElement.placeholder = basePrice;
  priceElement.dataset.pristineMinMessage  = `Минимальная цена ${basePrice}`;
  sliderElement.noUiSlider.set(+basePrice);

  formFiltersElement.reset();
  removeImages();
});

export {
  setPageToInactive,
  setPageToActive,
  setAddress,
  formAdElement
};
