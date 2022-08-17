import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

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
        <div><input type="radio" name='radio-localize-btn' value='ru' checked={props.language === 'ru'} onChange={callbacks.onChangeLanguage}/>{props.translate(props.language, props.codesHead.CODE_5) || 'Рус'}</div>
        <div><input type="radio" name='radio-localize-btn' value='eng' checked={props.language === 'eng'} onChange={callbacks.onChangeLanguage}/>{props.translate(props.language, props.codesHead.CODE_6) || 'Англ'}</div>
      </div>
    </div>
  )
}

Head.propTypes = {
  codesHead: propTypes.object.isRequired,
  changeLanguage: propTypes.func.isRequired,
  translate: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  language: propTypes.string.isRequired,
}

Head.defaultProps = {
  codesHead: {},
  changeLanguage: () => {},
  translate: () => {},
  title: 'Неизвестный товар',
}

export default React.memo(Head)