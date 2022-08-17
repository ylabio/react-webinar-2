import useStore from "./use-store";

export default function useTranslate(phrase) {
  const lang = useStore().get("language").getState().currentLang;

  const dictionary = require(`../languages/${lang}.json`);
  const phraseArr = phrase.split(".");
  let now = dictionary;

  phraseArr.forEach((item) => {
    now = now[item];
  });

  return now || `%${phrase}%`;
}
