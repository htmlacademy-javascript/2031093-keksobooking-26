const ALERT_SHOW_TIME = 5000;

const randomizerParametersAreCorrect = (min, max, functionErrorString) => {
  if (max === undefined) {
    throw new Error(`${functionErrorString} There are must be two numbers parameters.`);
  } else if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) {
    throw new Error(`${functionErrorString}  Parameters "min" and "max" must be numbers greater or equal to zero.`);
  } else if (min > max || min === max) {
    throw new Error(`${functionErrorString} Parameter "min" must be less then parameter "max".`);
  }

  return true;
};

const getRandomNumber = (min, max, tail, functionError) => {
  let result = null;

  if (randomizerParametersAreCorrect(min, max, functionError)) {
    result = +(  ( Math.random() * (max - min) + min ).toFixed(tail)  );
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

const showMapPinsAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showAdFormAlert = (type) => {
  const template = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alertElement = template.cloneNode(true);

  document.body.append(alertElement);

  return alertElement;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomArrayItem,
  getRandomArrayItemsCollection,
  getRandomIntegerNumber,
  getRandomRealNumber,
  showMapPinsAlert,
  showAdFormAlert,
  debounce
};
