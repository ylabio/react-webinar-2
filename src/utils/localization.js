import localization from '../localization.json';
import useStore from "./use-store";

/**
 * Достает слова для заданного языка из файла локализации
 * @returns {string}
 */
export default function locText(keyword) {
  const store = useStore();
  const currentLanguage = store.get('localization').getLanguage()
  const words = localization.languages[currentLanguage];

  if (!words)
    return '';

  return words[keyword];
}
