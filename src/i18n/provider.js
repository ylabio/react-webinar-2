import {I18nContext} from "./context";
import React, {useMemo, useState} from "react";
import get from "lodash.get";
import * as translations from "./export.js";

function I18nProvider({children}) {

  const [lang, setLang] = useState('ru');

  const i18n = useMemo(() => ({
    lang,
    setLang,
    translate: (text) => {
      return get(translations[lang], text, text);
    }
  }), [lang]);


  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}

export default I18nProvider;
