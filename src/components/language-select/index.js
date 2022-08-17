import { memo } from "react";
import React from "react";
import propTypes from "prop-types";

function LanguageSelect({ langState, setLanguage }) {
  return (
    <select
      value={langState().currentLanguage}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value="ru">русский</option>
      <option value="en">english</option>
    </select>
  );
}

LanguageSelect.propTypes = {
  langState: propTypes.func.isRequired,
  setLanguage: propTypes.func.isRequired,
};

export default memo(LanguageSelect);
