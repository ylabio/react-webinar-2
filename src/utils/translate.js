import { dictionaries } from '../locales';
import pluralRu from 'plural-ru';
import pluralEn from 'plural';

/**
 * Интернационализация слов
 * @param {string} language
 * @param {string} key
 * @param {number} count
 * @returns {string}
 */
export default function translate(language, key, count = 1) {
  const word = dictionaries[language][key];

  if (language === 'ru' && Array.isArray(word)) {
    return pluralRu(count, ...word);
  }
  if (language === 'en') {
    return pluralEn(word, count);
  }

  return word;
}
