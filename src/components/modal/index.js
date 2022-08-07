import React, { useCallback, useState } from 'react';
import propTypes, { string } from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import List from '../list';
import Button from '../button';
import { sumBasket } from '../../utils';

function Modal(props) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('background')}>
        <div className={cn('wrapper')}>
          <div className={cn('header')}>
            <div className={cn('title')}>
              {props.title}
            </div>
            <Button title="Закрыть" callBack={props.switchModal} />
          </div>
          {
            props.basket.length ?
              <>
                <div className={cn('list')}>
                  <List items={props.basket} callBack={props.deleteItem} buttonTitle={"Удалить"} />
                </div>
                <div className={cn('totalPrice')}>
                  {
                    <>
                      Итог <span>{sumBasket(props.basket)} ₽</span>
                    </>
                  }
                </div>
              </>
              :
              <div className={cn('nothing')}>
                Корзина пуста
              </div>
          }
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: propTypes.node.isRequired,
  switchModal: propTypes.func.isRequired,
  deleteItem: propTypes.func.isRequired,
  basket: propTypes.arrayOf(propTypes.object).isRequired,
}

Modal.defaultProps = {
  switchModal: () => { },
  deleteItem: () => { },
  basket: [],
  title: "Модальное окно"
}

export default React.memo(Modal);
