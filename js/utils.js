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
  let result = null;

  if (!randomizerParametersAreCorrect(min, max, functionError)) {
    result = null;
  } else {
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

export {
  getRandomArrayItem
  , getRandomArrayItemsCollection
  , getRandomIntegerNumber
  , getRandomRealNumber
};
