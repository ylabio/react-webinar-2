import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import { useLocation, useNavigate } from "react-router-dom"
import './styles.css';
import useStore from "../../utils/use-store"


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  const currentPath = useLocation();
  const navigate = useNavigate()
  const store = useStore()
  return (
    <div className={cn()}>
        <p className={cn('link')} onClick={()=> {
            if (currentPath.pathname === "/") {
                store.get('catalog').setPage(1)
            } else {
                navigate("/")
            }
        }}>Главная</p>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
      {amount
        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
        : `пусто`
      }
      </span>
      <button className='BasketSimple__button' onClick={onOpen}>Перейти</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default React.memo(BasketSimple);
