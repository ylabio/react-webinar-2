import React from 'react'
import plural from 'plural-ru';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getFormattedPrice} from '../../utils';
import {Button} from '../ui/button';
import './style.css'

function Cart(props) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('info')}>
        В корзине:
        <span>
          {props.itemsQuantity > 0 ?
            <>
              {props.itemsQuantity} {plural(props.itemsQuantity, "товар", "товара", "товаров")} / {getFormattedPrice(props.totalPrice)}
            </>
          :
            <>пусто</>
          }
        </span>
      </div>
      <Button onClick={props.onModalOpen}>Перейти</Button>
      {props.children}
    </div>
  )
}

export default React.memo(Cart)

Cart.propTypes = {
  itemsQuantity: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
  onModalOpen: propTypes.func.isRequired
}