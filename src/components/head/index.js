import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import changeLanguage from "../../utils/changeLanguage";

function Head(props){
  const cn = bem('Head')

  const callbacks = {
    onChangeLanguage: useCallback((e) => {
      props.changeLanguage(e.target.value)
    }, [props.changeLanguage])
  };

  return (
    <div className={cn()}>
      <h1>{props.title}</h1>
      <div className={cn('localization')}>
        <div><input type="radio" name='radio-localize-btn' value='ru' checked={props.language === 'ru'} onChange={callbacks.onChangeLanguage}/>{changeLanguage(props.language, 'RUS')}</div>
        <div><input type="radio" name='radio-localize-btn' value='eng' checked={props.language === 'eng'} onChange={callbacks.onChangeLanguage}/>{changeLanguage(props.language, 'ENG')}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: propTypes.string.isRequired,
  language: propTypes.string.isRequired
}

Head.defaultProps = {
  title: 'Неизвестный товар',
}

export default React.memo(Head)