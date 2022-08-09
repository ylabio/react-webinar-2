import React, { useCallback } from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Button from '../../shared/ui/button';
import plural from 'plural-ru';
import { formatPrice } from '../../shared/utils';
import propTypes from 'prop-types';

function Controls({ total, price, handleModal }) {
  const ending = plural(total, 'товар', 'товара', 'товаров');
  const cn = bem('Controls');

  const callbacks = {
    openModal: useCallback(() => {
      handleModal(true);
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <span className={cn('text')}>В корзине:</span>
        <span className={cn('cart')}>
          {total > 0 
            ? `${total} ${ending} / ${formatPrice(price)} ₽`
            : 'пусто'
          }
        </span>
      </div>
      
      <Button 
        text='Перейти'
        onClick={callbacks.openModal}
        disabled={total < 1} 
      />
    </div>
  );
}

Controls.propTypes = { 
  total: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  handleModal: propTypes.func.isRequired,
};

Controls.defaultProps = {};

export default React.memo(Controls);
