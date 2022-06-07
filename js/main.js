function randomizerParametersAreCorrect(min, max, functionErrorString) {
  let result = true;

  if (max === undefined) {
    console.log(`${functionErrorString} There are must be two number parameters.`);
    result = false;
  } else if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) {
    console.log(`${functionErrorString}  Parameters "min" and "max" must be numbers greater or equal to zero.`);
    result = false;
  } else if (min > max || min === max) {
    console.log(`${functionErrorString} Parameter "min" must be less then parameter "max".`);
    result = false;
  }

  return result;
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

alert(getRandomRealNumber(77.7, 888.8, 4));
alert(getRandomIntegerNumber(77, 777));
