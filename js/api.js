const MAP_PINS_FETCHING_ERROR_MESSAGE = 'Не удалось получить данные об объявлениях';
const FORM_SENDING_ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';
const POST_METHOD = 'POST';
const TYPE_MULTIPART_FORM_DATA = 'multipart/form-data';
const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';

const getJson = (response, errorMessage) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(errorMessage);
  }
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_DATA_URL);
    const data = await getJson(response, MAP_PINS_FETCHING_ERROR_MESSAGE);

    onSuccess(data);

  } catch (error) {
    onFail(MAP_PINS_FETCHING_ERROR_MESSAGE);
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
    onFail(FORM_SENDING_ERROR_MESSAGE);
  }
};

export {
  getData,
  sendData
};
