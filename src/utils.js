import React from 'react';

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function СlickedCounter(prop){
    if (prop.prop != 0) {
      return <div className='item__clicked'>| Выделялось {prop.prop} {declination(prop.prop, ["раз", "раза", "раз"])} </div>
    }
}

const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];