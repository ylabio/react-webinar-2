import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import plural from "plural-ru";

function Controls({items, onClickModal}){
  const cn = bem('Controls');

  const totalPrice = items.reduce((a, b) => a + b.price * b.amount, 0)

  return (
      <div className={cn()}>
        <div className={cn('title')}>
          В корзине :
        </div>
            <div className={cn("amount")}>
                {items.length ?
                    <b>{items.length} {plural(items.length,
                        'товар', 
                        'товара',
                        'товаров')} / ${totalPrice} ₽ </b>
                    :
                    <b> пусто</b>}
            </div>
        <button onClick={onClickModal}>Перейти</button>
      </div>

  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
