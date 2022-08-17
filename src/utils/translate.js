import {enNames, ruNames} from './names';

//Функция для перевода
export const translate = (valLang, word) => {
  if (valLang === 'en') {
    return enNames[word];
  } else {
      return ruNames[word];
  }
}
