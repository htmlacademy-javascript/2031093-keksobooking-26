function randomizerParametersAreCorrect(min, max, functionErrorString) {
  //let result = true;

  if (max === undefined) {
    throw new Error(`${functionErrorString} There are must be two number parameters.`);
    //result = false;
  } else if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) {
    throw new Error(`${functionErrorString}  Parameters "min" and "max" must be numbers greater or equal to zero.`);
    //result = false;
  } else if (min > max || min === max) {
    throw new Error(`${functionErrorString} Parameter "min" must be less then parameter "max".`);
    //result = false;
  }

  return true;
}

function getRandomNumber(min, max, tail, functionError) {
  const pow = Math.pow(10, tail);
  let result = null;

  if (!randomizerParametersAreCorrect(min, max, functionError)) {
    result = null;
  } else {
    result = Math.floor((Math.random() * (max - min) + min) * pow) / pow;
  }

  return result;
}

function getRandomIntegerNumber(min, max) {
  const functionError = 'getRandomInteger function error!';

  return getRandomNumber(min, max, 0, functionError);
}

function getRandomRealNumber(min, max, tail) {
  const functionError = 'getRandomRealNumber function error!';

  return getRandomNumber(min, max, tail, functionError);
}

getRandomRealNumber(77.7, 888.8, 4);
getRandomIntegerNumber(77, 77);
