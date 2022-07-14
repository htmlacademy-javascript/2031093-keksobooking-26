const formAdElement = document.querySelector('.ad-form');
const formFiltersElement = document.querySelector('.map__filters');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');
const addressElement = document.querySelector('#address');
const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
// const formResetButtonElement = document.querySelector('.ad-form__reset');

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

const pristine = new Pristine(formAdElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
}, true);

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
  setFormToActive(formAdElement);
  setFormToActive(formFiltersElement);
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

  pristine.validate(priceElement);
};

const onTypeChange = () => {
  onPriceChange();
};

const onTimeinChange = () => {
  timeoutElement.value = timeinElement.value;
};

const onTimeoutChange = () => {
  timeinElement.value = timeoutElement.value;
};

pristine.addValidator(roomNumberElement, validateCapacity, getRoomNumberErrorMessage);
pristine.addValidator(capacityElement, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

roomNumberElement.addEventListener('change', onRoomsChange);
capacityElement.addEventListener('change', onCapacityChange);
typeElement.addEventListener('change', onTypeChange);
priceElement.addEventListener('change', onPriceChange);
timeinElement.addEventListener('change', onTimeinChange);
timeoutElement.addEventListener('change', onTimeoutChange);

formAdElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    formAdElement.submit();
  }
});

export {
  setPageToInactive
  , setPageToActive
  , setAddress
  , formAdElement
};
