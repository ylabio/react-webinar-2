import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Basket(props) {
  const cn = bem('Basket');
  return (
    <div className={props.isVisible ? cn({visible: true}) : cn()}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('add-button')} onClick={props.closePopup}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}

Basket.propTypes = {
  isVisible: propTypes.bool,
  closePopup: propTypes.func,
}

Basket.defaultProps = {
  isVisible: false,
  closePopup: () => {},
}

export default React.memo(Basket);
