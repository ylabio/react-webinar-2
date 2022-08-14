import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';


function Language({setLang, change}) {

  const cn = bem('Language');

  return (
    <div className={cn()}>
      <p>{change} </p> 
      <div className={cn('switcher')} onClick={() => setLang(0)}>
        EN
      </div>
      <div className={cn('switcher')} onClick={() => setLang(1)}>
        RU
      </div>
      <div className={cn('switcher')} onClick={() => setLang(2)}>
        FN
      </div>
    </div>
  )
}

Language.propTypes = {
    setLang: propTypes.func.isRequired,
    change: propTypes.string
}

Language.defaultProps = {
    setLang: () => {},
    change: 'Сменить язык на'
}

export default React.memo(Language);
