import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru"
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Controls({handleClick, cart}){
  const cn = bem('Controls')

  const callbacks = {
    showCart: useCallback(() => {
      handleClick() 
    }, [handleClick])
    // Наверно, этот юсколбэк бесполезен
  }

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        В корзине: 
        <span className={cn("boldText")}>
          {
            cart.items.length 
            ? `${plural(cart.items.length, "%d товар", "%d товара", "%d товаров")} / ${cart.cost.toLocaleString('ru')} ₽` 
            : "пусто"
          }
        </span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.showCart}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  handleClick: propTypes.func.isRequired, // Обязательное свойство - функция
  cart: propTypes.object.isRequired
}

Controls.defaultProps = {
  // Бойлерплейт если нужно будет приколить необязательные пропсы, бандл не увеличивает вроде
}

export default React.memo(Controls);
