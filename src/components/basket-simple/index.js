import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import { Link } from 'react-router-dom';
import Translate from '../../app/translate';


function BasketSimple({sum, amount, onOpen, lang}) {
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
      <Link to='/' className={cn('link')}>
        <Translate text={'Главная'} />
      </Link>
      
      <div className={cn('cart')}>
        <span className={cn('label')}>
          <Translate text={'В корзине'} />:
        </span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${callbacks.multiLangPlural()} / ${sum.toLocaleString(lang)} ₽`
          : <Translate text={'пусто'} />
        }
        </span>

        <button 
          className='BasketSimple__button' 
          onClick={onOpen}
          >
            <Translate text={'Перейти'} />
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
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
