import {useCallback} from 'react';
import useSelector from "./use-selector";
import translate from "../utils/translate";
import useStore from "./use-store";

/**
 * Хук возвращает функция для локализации текстов
 * Связан с кодом языка из внешнего состояния
 */
export default function useTranslate() {
  const store = useStore();

  // Текущая локаль
  const lang = useSelector(state => state.locale.lang);

  // Функция для семны локали
  const setLang = useCallback(lang => store.get('locale').setLang(lang), []);

  // Функция для локализации текстов
  const t = useCallback((text, number = undefined) => {
    return translate(lang, text, number)
  }, [lang]);


  return {lang, setLang, t};
}
