import React from "react";
import { LocaleContext } from "../../contexts/locale.context";
import ru from "../../locales/ru.locale.json";
import en from "../../locales/en.locale.json";
import useSelector from "../../utils/use-selector";

const translations = {
  ru,
  en
};

function Locale (props) {

  const languages = useSelector(state => state.language.languages);

  const handle = (s) => {
    return translations[languages][s.toLowerCase()] || s;
  }

  return (
    <LocaleContext.Provider
      value={{
        current: languages,
        handle: handle
      }}>
      {props.children}
    </LocaleContext.Provider>
  );
}

export {Locale};