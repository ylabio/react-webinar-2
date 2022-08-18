import en from '../public/locales/en/translation.json';
import ru from '../public/locales/ru/translation.json';

const text = {en, ru}

export default function translate(language, name) {
  return text[language][name];
}