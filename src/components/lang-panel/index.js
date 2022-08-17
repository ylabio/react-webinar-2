import React from "react";
import ru from "../../locales/ru.locale.json";
import en from "../../locales/en.locale.json";
import { useState, useEffect } from "react";
import "./style.css"

const translations = {
  ru,
  en
};

function LangPanel({changeLang, language}) {
    const [codeLanguage, setCodeLanguage] = useState(language)

    useEffect(() => {
        changeLang(codeLanguage)
    }, [codeLanguage])

    return(
        <div className="LocaleSelector">
          <select
            defaultValue={codeLanguage}
            onChange={event => {
              const langCode = event.target.value;
              setCodeLanguage(langCode);
            }}
          >
            {Object.keys(translations).map(lang => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
    )
}

export default LangPanel;