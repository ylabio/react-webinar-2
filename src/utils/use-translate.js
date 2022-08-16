import useSelector from './use-selector'
import {languages} from '../assets/languages'

/**
 * Хук для выполнения перевода
 * @return {function}
 */
export default function useTranslate() {
  const lang = useSelector(state => state.lang.name)

  function translate(text) {
    console.log(text)
     if (Object.keys(languages).includes(lang)) {
       return languages[lang][text] || text
     }
     return text
   }

  return translate
}