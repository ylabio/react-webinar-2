import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';
import Controls from '../controls';

function Modal({ name, cart, calcCost, modalActive, setModalActive, onDelete }) {
  const cn = bem('Modal');

  return (
    <div className={cn("wrapper", {
      ['active']: modalActive
    })}
      onClick={() => setModalActive(false)}>
      <div className={cn()}
        onClick={(e) => e.stopPropagation()}>
        <div className={cn("head")}>
          <h1>{name}</h1>
          <Controls action={() => setModalActive(false)} text='Закрыть' />
        </div>
        {cart.length ?
          <div className={cn("content")}>{cart.map(item =>
            <div key={item.code} className={cn('content-item')}>
              <Item item={item} butText={"Удалить"} butAction={onDelete} />
            </div>
          )}
            <div className={cn('content-total')}>
              <span>Итого</span>
              <span>{calcCost()} ₽</span>
            </div>
          </div>
          :
          <div className={cn('empty')}>
            Здесь пока ничего нет
          </div>
        }
      </div>
    </div>
  )
}

Modal.propTypes = {
  calcCost: propTypes.func,
  modalActive: propTypes.bool.isRequired,
  setModalActive: propTypes.func.isRequired,
  cart: propTypes.array.isRequired,
  onDelete: propTypes.func,
  name: propTypes.string
}

Modal.defaultProps = {
  calcCost: () => { },
  modalActive: false,
  setModalActive: () => { },
  cart: [],
  onDelete: () => { },
  name: ""
}

export default React.memo(Modal);
