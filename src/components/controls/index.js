import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Controls({getCartStats, onOpen}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('stats')}>
        В корзине: <strong>{getCartStats().count ? `${getCartStats().count} товара / ${getCartStats().sumPrice.toLocaleString()} ₽` : `пусто`}</strong>
      </div>
      <button onClick={onOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обяхательное свойство - функция
  getCartStats:  propTypes.func.isRequired
}

Controls.defaultProps = {
  onOpen: () => {}, // Значение по умолчанию - функция-заглушка
  getCartStats: () => {}
}

export default React.memo(Controls);
