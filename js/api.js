const MAP_PINS_FETCHING_ERROR_MESSAGE = 'Не удалось получить данные об объявлениях';
const FORM_SENDING_ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';
const DEFAULT_JSON_EXTRACTING_ERROR_MESSAGE = 'произошла неизвестная ошибка';
const POST_METHOD = 'POST';
const TYPE_MULTIPART_FORM_DATA = 'multipart/form-data';
const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';

const getJson = (response, errorMessage = DEFAULT_JSON_EXTRACTING_ERROR_MESSAGE) => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_DATA_URL);
    const data = await getJson(response, MAP_PINS_FETCHING_ERROR_MESSAGE);

    onSuccess(data);

  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      POST_DATA_URL,
      {
        method: POST_METHOD,
        type: TYPE_MULTIPART_FORM_DATA,
        body,
      },
    );
    const data = await getJson(response, FORM_SENDING_ERROR_MESSAGE);

    onSuccess(data);

  } catch (error) {
    onFail(error.message);
  }
};

export {
  getData,
  sendData
};
