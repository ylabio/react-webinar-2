import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import { useNavigate } from 'react-router-dom';


function BasketSimple(props) {
  const cn = bem('BasketSimple');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    if(props.setCurrentPage) {
      props.setCurrentPage(1);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('main')} onClick={handleClick}>
        {props.lang ? 'Main' : 'Главная'}
      </div>
      <div>
        <span className={cn('label')}>{props.lang ? 'In the cart:' : 'В корзине:'}</span>
        <span className={cn('total')}>
        {props.amount
          ? (props.lang ? `${props.amount} ${plural(props.amount, 'product', 'products')} / ${numberFormat(props.sum)} ₽` : `${props.amount} ${plural(props.amount, 'товар', 'товара', 'товаров')} / ${numberFormat(props.sum)} ₽`)
          : (props.lang ? 'empty' :'пусто')
        }
        </span>
        <button className='BasketSimple__button' onClick={props.onOpen}>{props.lang ? 'Go to cart' : 'Перейти'}</button>
      </div>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  lang: propTypes.bool.isRequired,
  setCurrentPage: propTypes.func,
  sum: propTypes.number,
  amount: propTypes.number
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  setCurrentPage: null
}

export default React.memo(BasketSimple);
