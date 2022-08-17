import * as modulesLang from '../lang/exportsLang.js';

export default function translate(lang, word) {
  return (typeof modulesLang[lang] === 'undefined' || typeof modulesLang[lang]()[word] === 'undefined') ? word : modulesLang[lang]()[word];
}