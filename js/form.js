const formAdElement = document.querySelector('.ad-form');
const formFiltersElement = document.querySelector('.map__filters');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
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

const validateCapacity = () => capacityOption[roomNumberElement.value].includes(capacityElement.value);

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

const onRoomsChange = () => {
  pristine.validate(capacityElement);
};

const onCapacityChange = () => {
  pristine.validate(roomNumberElement);
};

pristine.addValidator(roomNumberElement, validateCapacity, getRoomNumberErrorMessage);
pristine.addValidator(capacityElement, validateCapacity, getCapacityErrorMessage);

roomNumberElement.addEventListener('change', onRoomsChange);
capacityElement.addEventListener('change', onCapacityChange);

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
};
