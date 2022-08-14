import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useSelector from '../../utils/use-selector';

function LanguageSwitch({changeLanguage}) {
  const cn = bem('LanguageSwitch');

  const select = useSelector(state => ({
    val: state.names.val
  }));

  return (
    <div className={cn()}>
      <button className={cn('button', select.val==='ru'&&{'active': true})} onClick={()=>changeLanguage('ru')}>RU</button>
      <button className={cn('button', select.val==='en'&&{'active': true})} onClick={()=>changeLanguage('en')}>EN</button>
    </div>
  )
}

LanguageSwitch.propTypes = {
  changeLanguage: propTypes.func.isRequired,
}

export default React.memo(LanguageSwitch);
