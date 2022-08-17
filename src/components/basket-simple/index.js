import React, { useCallback, useContext } from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { Link } from 'react-router-dom';
import { ContextTitle } from './../../store/contextTitle';
import useStore from '../../utils/use-store';

function BasketSimple({ sum, amount, onOpen }) {
  const cn = bem('BasketSimple');
  const store = useStore()
  const callbacks = {
    cuurentItemDefaultValue: useCallback(() => store.get('catalog').cuurentItemDefaultValue(), []),

    getItems: useCallback((nextList) => {
      store.get('catalog').getItems(nextList)
    }, [])


  };
  const {title, setTitle } = useContext(ContextTitle)
  return (
    <>
      <div className={cn()}>
        <div className={cn('home')} >
          <Link to='/' onClick={() => {
            callbacks.cuurentItemDefaultValue()
            localStorage.setItem('title','Магазин')
            setTitle('Магазин')
          }} >Главная</Link>
        </div>
        <div className={cn('wrapperBasket')}>
          <span className={cn('label')}>В корзине:</span>
          <span className={cn('total')}>
            {amount
              ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
              : `пусто`
            }
          </span>
          <button className='BasketSimple__button' onClick={onOpen}>Перейти</button>
        </div>

      </div>
    </>

  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
}

BasketSimple.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
}

export default React.memo(BasketSimple);
