import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Модально окно. Чтобы не было путаницы, модальное окно назвал по аналогии с названием массива запсией в корзине.
 * Структурой и логикой компонента вдохновлялся видосом на ютубе от Ulbi TV
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Cart(props) {

  const cn = bem('Cart');

  const callbacks = {

    onChangeActive: React.useCallback(() => {
      props.setActive(false);
    }, [props.setActive]),

    onContentClick: React.useCallback(e => {
      e.stopPropagation()
    }, []),

  };

  return (
    <div className={props.isActive ? cn() + ' Active' : cn()} onClick={callbacks.onChangeActive}>
      <div className={props.isActive ? cn('content') + ' Active' : cn('content')} onClick={callbacks.onContentClick}>
        <div className={cn('content-head')}>
          {props.headName}
          <button className={cn('content-head-btn')} onClick={callbacks.onChangeActive}> Закрыть </button>
        </div>
        {props.children}
        {(props.footTotal !== '0') && <div className={cn('content-foot')}>
          <div className={cn('content-foot-text')}> Итого </div>
          <div className={cn('content-foot-total')}> {props.footTotal} ₽ </div>
        </div>}
      </div>
    </div>
  );

};

Cart.propTypes = {
  isActive: propTypes.bool.isRequired,
  headName: propTypes.string,
  footTotal: propTypes.string,
  children: propTypes.node,
}

Cart.defaultProps = {
  headName: 'Modal Example',
  footTotal: '0'
}

export default React.memo(Cart);