import React, { useContext } from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { ContextTitle } from './../../store/contextTitle';
import LinkMenu from '../link-menu';

function BasketSimple({ sum, amount, onOpen, cuurentItemDefaultValue }) {
  const cn = bem('BasketSimple');


  const { setTitle } = useContext(ContextTitle)
  return (
    <>
      <div className={cn()}>
        <div className={cn('home')} >
          <LinkMenu
            path={'/'}
            cuurentItemDefaultValue={cuurentItemDefaultValue}
            setTitle={setTitle}
            title={'Магазин'}
            localStorageKey={'title'}
            localStorageValue={'Магазин'}>
            Главнaя
          </LinkMenu>

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

  cuurentItemDefaultValue: propTypes.func.isRequired
}

BasketSimple.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
}

export default React.memo(BasketSimple);
