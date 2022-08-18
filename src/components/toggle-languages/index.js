import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css';

function ToggleLanguages({ changeLanguage, language }) {
  const cn = bem('Languages');

  return (
    <div className={cn()}>
      <div
        onClick={() => changeLanguage('ru')}
        className={cn('item', { active: language === 'ru' })}
      >
        ru
      </div>
      <div
        onClick={() => changeLanguage('en')}
        className={cn('item', { active: language === 'en' })}
      >
        en
      </div>
    </div>
  );
}

ToggleLanguages.propTypes = {
  changeLanguage: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
};

ToggleLanguages.defaultProps = {};

export default React.memo(ToggleLanguages);
