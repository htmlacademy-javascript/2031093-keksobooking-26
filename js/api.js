const MAP_PINS_FETCHING_ERROR_MESSAGE = 'Не удалось получить данные об объявлениях';
const FORM_SENDING_ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте ещё раз';
const POST_METHOD = 'POST';
const TYPE_MULTIPART_FORM_DATA = 'multipart/form-data';
const GET_DATA_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const POST_DATA_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(MAP_PINS_FETCHING_ERROR_MESSAGE);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(MAP_PINS_FETCHING_ERROR_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    POST_DATA_URL,
    {
      method: POST_METHOD,
      type: TYPE_MULTIPART_FORM_DATA,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(FORM_SENDING_ERROR_MESSAGE);
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(FORM_SENDING_ERROR_MESSAGE);
    });
};

export {
  getData
  , sendData
};
