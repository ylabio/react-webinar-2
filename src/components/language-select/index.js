import React, {useContext} from 'react';
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {LanguageContext} from "../../services/locale/context";

function LanguageSelect() {
  const cn = bem('LanguageSelect');
  const {language, toggleLanguage} = useContext(LanguageContext);

  return (
    <select
      className={cn()}
      value={language}
      onChange={(evt) => toggleLanguage(evt.target.value)}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
}

export default React.memo(LanguageSelect);
