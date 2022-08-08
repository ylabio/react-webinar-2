import React, {useState, useMemo, useCallback} from 'react'
import plural from 'plural-ru';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Modal from '../modal';
import List from '../list'
import Item from '../item'
import {getFormattedPrice} from '../../utils';
import {Button} from '../ui/button';
import './style.css'

function Cart(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cn = bem('Cart');

  const onModalClose = () => {
    setIsModalOpen(false)
  }
  const onModalOpen = () => {
    setIsModalOpen(true)
  }

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
      <Button onClick={onModalOpen}>Перейти</Button>
      <Modal title={"Корзина"} isOpen={isModalOpen} onClose={onModalClose}>
        {props.itemsQuantity > 0 ?
        <>
          <List items={props.items} 
                renderItem={(item) => (
                  <Item key={item.code} 
                        item={item} 
                        buttonText={"Удалить"}
                        onButtonClick={props.onDelete}
                  />
                )}
          />
          <div className={cn('total')}>
            Итого: <span className={cn('total-price')}>{getFormattedPrice(props.totalPrice)}</span>
          </div>
        </>
        :
          <div className={cn('empty')}>Корзина пуста</div>
        } 
      </Modal>
    </div>
  )
}

export default Cart

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  itemsQuantity: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
  onDelete: propTypes.func.isRequired
}

Cart.defaultProps = {
  items: [],
  itemsQuantity: 0,
  totalPrice: 0,
  onDelete: () => {}
}