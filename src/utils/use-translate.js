import useSelector from "./use-selector";

export default function useTranslate(phrase) {
  const lang = useSelector((state) => {
    return state.language.currentLang;
  });

  const dictionary = require(`../languages/${lang}.json`);
  const phraseArr = phrase.split(".");
  let now = dictionary;

  phraseArr.forEach((item) => {
    now = now[item];
  });

  return now || `%${phrase}%`;
}
