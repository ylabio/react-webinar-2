import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Controls({getCartStats, onOpen}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('stats')}>
        В корзине: <strong>{getCartStats().count ? `${getCartStats().count} товара / ${getCartStats().sumPrice.toLocaleString('Ru-ru')} ₽` : `пусто`}</strong>
      </div>
      <button onClick={onOpen}>Перейти</button>
    </div>
  )
}

export default React.memo(Controls);
