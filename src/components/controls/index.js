import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls({onModal, textButton}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <button onClick={onModal}>{textButton}</button>
    </div>
  )
}

Controls.propTypes = {
  onModal: propTypes.func, // Обяхательное свойство - функция
  textButton: propTypes.string
}

Controls.defaultProps = {
  onModal: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
