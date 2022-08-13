import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import './styles.css';

function BasketSimple({ sum, amount, onOpen }) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <NavLink className={cn('link')} to="/">
        Главная
      </NavLink>
      <div>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽` : `пусто`}
        </span>
        <button className="BasketSimple__button" onClick={onOpen}>
          Перейти
        </button>
      </div>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);
