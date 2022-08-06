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
  // считаем стоимость добавленных в корзину товаров
  const totalPrice = useMemo(() => props.items.reduce((acc, cur) => acc + cur.price * cur.amount, 0), [props.items])
  
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
          {props.items.length > 0 ?
            <>
              {props.items.length} {plural(props.items.length, "товар", "товара", "товаров")} / {getFormattedPrice(totalPrice)}
            </>
          :
            <>пусто</>
          }
        </span>
      </div>
      <Button onClick={onModalOpen}>Перейти</Button>
      <Modal title={"Корзина"} isOpen={isModalOpen} onClose={onModalClose}>
        {props.items.length > 0 ?
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
            Итого: <span className={cn('total-price')}>{getFormattedPrice(totalPrice)}</span>
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
  onDelete: propTypes.func.isRequired
}

Cart.defaultProps = {
  items: [],
  onDelete: () => {}
}