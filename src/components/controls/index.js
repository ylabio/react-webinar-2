import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Button from '../../shared/ui/button';
import { AppContext } from '../../context/app-context';
import plural from 'plural-ru';
import { formatPrice } from '../../shared/utils';

function Controls() {
  const {store} = useContext(AppContext);
  const {total, price} = store.state.goods;
  const ending = plural(total, 'товар', 'товара', 'товаров');
  const cn = bem('Controls');

  const callbacks = {
    openModal: useCallback(() => {
      store.handleModal(true);
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
  )
}

Controls.propTypes = {};

Controls.defaultProps = {};

export default React.memo(Controls);
