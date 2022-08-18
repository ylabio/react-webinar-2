import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';


function BasketSimple({sum, amount, onOpen, translate: {text, goods, btn}}) {
  const cn = bem('BasketSimple');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{text}</span>
      <span className={cn('total')}>{goods(amount, sum)}</span>
      <button className='BasketSimple__button' onClick={onOpen}>{btn}</button>
    </div>
  )
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  translate: propTypes.object
}

BasketSimple.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  translate: {
    text: 'text',
    goods: () => 'text',
    btn: 'text'
  }
}

export default React.memo(BasketSimple);
