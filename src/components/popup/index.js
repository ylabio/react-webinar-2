import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import TotalPrice from '../totalPrice';
import ItemInBin from '../itemInBin';
import List from '../list/index';
import './style.css';

const Popup = ({ name, onCloseModal, children }) => {
  const cn = bem('Popup');

  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('header')}>
          <h3 className={cn('title')}>{name}</h3>
          <div className={cn('actions')}>
            <button className={cn('btn')} onClick={onCloseModal}>
              Закрыть
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

Popup.propTypes = {
  name: propTypes.string.isRequired,
  onCloseModal: propTypes.func.isRequired,
};

export default React.memo(Popup);
