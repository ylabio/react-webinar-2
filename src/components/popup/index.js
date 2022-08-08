import React from 'react';
import ItemInBin from '../item-in-bin';
import TotalPrice from '../totalPrice';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

const Popup = ({
  name,
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
          <h3 className={cn('title')}>{name}</h3>
          <div className={cn('actions')}>
            <button className={cn('btn')} onClick={onCloseModal}>
              Закрыть
            </button>
          </div>
        </div>
        <div className={cn('items')}>
          {items.map((item) => {
            return (
              <ItemInBin
                item={item}
                onDeleteItemFromBin={onDeleteItemFromBin}
                key={item.code}
              />
            );
          })}
        </div>
        <TotalPrice totalPrice={totalPrice} />
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

export default React.memo(Popup);
