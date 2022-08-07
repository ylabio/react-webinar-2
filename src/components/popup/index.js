import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

const Popup = ({
  items,
  totalPrice,
  isOpen,
  onCloseModal,
  onDeleteItemFromBin,
}) => {
  const cn = bem('Popup');

  return (
    <div className={isOpen ? `${cn()} ${cn('opened')} ` : cn()}>
      <div className={cn('container')}>
        <div className={cn('header')}>
          <h3 className={cn('title')}>Корзина</h3>
          <div className={cn('actions')}>
            <button className={cn('btn')} onClick={onCloseModal}>
              Закрыть
            </button>
          </div>
        </div>
        <div className={cn('items')}>
          {items.map((item) => {
            if (item.addCounter) {
              return (
                <div key={item.code} className={cn('item')}>
                  <div className={cn('item-flex-start')}>
                    <div className={cn('item-number')}>{item.code}</div>
                    <div className={cn('item-title')}>{item.title}</div>
                  </div>
                  <div className={cn('item-flex-end')}>
                    <div
                      className={cn('item-price')}
                    >{`${item.price.toLocaleString('ru-RU')} ₽`}</div>
                    <div
                      className={cn('item-counter')}
                    >{`${item.addCounter} шт`}</div>
                    <div className={cn('actions')}>
                      <button onClick={() => onDeleteItemFromBin(item.code)}>
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={cn('total')}>
          <p className={cn('total-word')}>Итого</p>
          <p className={cn('total-number')}>{`${totalPrice.toLocaleString(
            'ru-RU'
          )} ₽`}</p>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onCloseModal: propTypes.func.isRequired,
  onDeleteItemFromBin: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  totalPrice: propTypes.number.isRequired,
};

Popup.defaultProps = {
  items: [],
  onCloseModal: () => {},
  onDeleteItemFromBin: () => {},
  isOpen: false,
  totalPrice: 0,
};

export default Popup;
