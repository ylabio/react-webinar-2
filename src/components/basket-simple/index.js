import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import NavMenu from '../../components/nav-menu';
import './styles.css';


function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  // Список элементов меню. Пока оставил тут
  const navMenu = [
    {
      title: 'Главная',
      link: '/',
    }, 
  ];

  return (
    <div className={cn()}>
      <NavMenu links={navMenu} />
      <div>
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
