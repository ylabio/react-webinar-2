import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

const LangControls = ({ language, onLangChange }) => {
  const cn = bem('Lang-controls');

  return (
    <select
      onChange={(e) => onLangChange(e.target.value)}
      defaultValue={language}
      className={cn()}
    >
      <option value={'en'}>en</option>
      <option value={'ru'}>ru</option>
    </select>
  );
};

LangControls.propTypes = {
  onLangChange: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
}

export default React.memo(LangControls);
