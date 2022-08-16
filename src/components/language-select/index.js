import React from 'react';
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

function LanguageSelect(props) {
  const cn = bem('LanguageSelect');

  return (
    <select
      className={cn()}
      value={props.currentLanguage}
      onChange={(evt) => props.onChange(evt.target.value)}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
}

LanguageSelect.propTypes = {
  onLanguageChange: propTypes.func,
  currentLanguage: propTypes.string.isRequired,
}

LanguageSelect.defaultProps = {
  onLanguageChange: () => {},
}

export default React.memo(LanguageSelect);
