import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LangSwitcher(props) {
  return (
    <label className="LangSwitcher">
      <input
        type="checkbox"
        onChange={props.switchLang}
        checked={props.currentLang !== 'RU'}
      />
      <span className="slider round"></span>
      <span className="select-ru">RU</span>
      <span className="select-en">EN</span>
    </label>
  );
};


LangSwitcher.propTypes = {
  currentLang: PropTypes.string,
  switchLang: PropTypes.func
};

LangSwitcher.defaultProps = {
  currentLang: 'RU',
  switchLang: () => {}
};

export default React.memo(LangSwitcher);
