import React, { useCallback, useContext, useState } from "react";
import { enLocale } from "../locales/en";
import { ruLocale } from "../locales/ru";

const locales = {
  ruLocale,
  enLocale,
}

export const TranslationContext = React.createContext({
  locale: 'ruLocale',
  setLocale: () => {},
});

export const Translate = (props) => {
  const [locale, setLocale] = useState('ruLocale');

  return (
    <TranslationContext.Provider value={{ locale, setLocale }}>
      {props.children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const { locale, setLocale } = useContext(TranslationContext);
  const t = useCallback((key) => locales[locale][key], [locale]);
  return [ t, setLocale ];
}
