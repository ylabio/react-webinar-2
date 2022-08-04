import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('label')}>В Корзине:<b>{'\t' + props.stats}</b></div>
      <button onClick={props.onButtonClick} className={cn('showBasket')}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onButtonClick: propTypes.func.isRequired, // Обязательное свойство - функция
  stats: propTypes.string
}

Controls.defaultProps = {
  onButtonClick: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
