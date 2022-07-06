const formAdElement = document.querySelector('.ad-form');
const formFiltersElement = document.querySelector('.map__filters');

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

export {
  setPageToInactive
  , setPageToActive
};
