import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketSimple({sum, amount, onOpen, lang, traslationData}) {
  const callbacks = {
    multiLangPlural: useCallback(() => { 
      if (lang === 'ru') {
        return plural(amount, 'товар', 'товара', 'товаров');
      }

      return amount > 1 ? 'products' : 'product';
    }, [lang]),
  };

  const cn = bem('BasketSimple');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        <span className={cn('label')}>
          {traslationData.inCart}:
        </span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${callbacks.multiLangPlural()} / ${sum.toLocaleString(lang)} ₽`
          : `${traslationData.empty}`
        }
        </span>

        <button 
          className='BasketSimple__button' 
          onClick={onOpen}
          >
            {traslationData.go_to}
        </button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  lang: propTypes.string.isRequired,
  traslationData: propTypes.object.isRequired,
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
