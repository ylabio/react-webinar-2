import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls({onAdd}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      В корзине:
      <span className={cn('info')}>2 товара / 223 ₽</span>
      <button className={cn('button')} onClick={onAdd}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обязательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
