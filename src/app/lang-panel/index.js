import React from "react";
import ru from "../../locales/ru.locale.json";
import en from "../../locales/en.locale.json";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import { useState, useEffect } from "react";
import "./style.css"

const translations = {
  ru,
  en
};

const lang = navigator.language || navigator.userLanguage; //вытаскиеваем из браузера предустановленный язык

function LangPanel() {
    let langCode = localStorage.getItem("langCode") || "ru";
    const store = useStore();

    if (!Object.keys(translations).includes(langCode)) {
      langCode = "ru";
    }

    const [codeLanguage, setCodeLanguage] = useState(lang.substr(0, 2))
    const languages = useSelector(state => state.language.languages);

    useEffect(() => {
        store.get('language').changeLang(codeLanguage);
    }, [codeLanguage])

    return(
        <div className="LocaleSelector">
          <select
            defaultValue={codeLanguage}
            onChange={event => {
              const langCode = event.target.value;
              localStorage.setItem("langCode", langCode);
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