import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LanguageSwitch({changeLanguage, val}) {
  const cn = bem('LanguageSwitch');

  return (
    <div className={cn()}>
      <button className={cn('button', val==='ru'&&{'active': true})} onClick={()=>changeLanguage('ru')}>RU</button>
      <button className={cn('button', val==='en'&&{'active': true})} onClick={()=>changeLanguage('en')}>EN</button>
    </div>
  )
}

LanguageSwitch.propTypes = {
  changeLanguage: propTypes.func.isRequired,
}

export default React.memo(LanguageSwitch);
