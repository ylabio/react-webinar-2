/**
 * функция для придания ошибкам при обращении к api больше информативности
 * @param {Error} errorObj
 * @returns {string}
 */

export function handleErrorFromApi(errorObj) {
  let message = '';

  // запрос был сделан и пришел ответ
  if (errorObj.response) {
    // пришел ответ в json из api
    if (errorObj.response.data.error) {
      message = errorObj.response.data.error.data.issues
        .map(issue => issue.message)
        .join('\n');
    } else {
      // просто отрицательный ответ от сервера без специального сообщения
      message = errorObj.message;
    }
  } else if (errorObj.request) {
    // ответ от сервера не пришел
    message = `The request was made but no response was received ${errorObj.request}`;
  } else {
    // ошибка при формировании самого запроса
    message = errorObj.message;
  }

  return message;
}
