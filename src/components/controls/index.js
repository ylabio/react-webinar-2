import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import Button from '../button';
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";

function Controls({ sum, count }) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('price')}>
        В корзине: <span>
          {sum
            ? `${count} ${plural(count, 'товар', 'товара', 'товаров')} / 
            ${sum.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}`
            : 'пусто'}
        </span>
      </div>
      <Button>Перейти</Button>
    </div>
  )
}

Controls.propTypes = {
  sum: propTypes.number,
  count: propTypes.number
}

Controls.defaultProps = {
  sum: 0,
  count: 0
}

export default React.memo(Controls);
