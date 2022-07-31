import React from 'react';

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function СlickedCounter(prop){
  console.log(prop);
    if (prop.prop != 0) {
      return <div className='item__clicked'>| Выделялось {prop.prop} раз </div>
    }
}