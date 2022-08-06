import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import CardItem from '../carditem';
import './style.css';

function Card(props){

  const cn = bem('Card');

  let list = [];
  let totalPrice = 0;
  
  for (let i in props.card) {
    list.push(
      <CardItem key={i} 
                counter={i}
                item={props.card[i]} 
                onDelete={props.onItemDelete}
      />
    );
    totalPrice += props.card[i].price * props.card[i].count;
  }

  return (
    <div className={props.active? cn() : cn({ '': 'nodisplay' }) }>
      <div className={cn('content')}>
        <div className={cn('head')}>
            <h2 className={cn('name')}>Корзина</h2>
            <button className={cn('close')} onClick={() => props.setActive(false)}>Закрыть</button>
        </div>
        <div className={cn('list')}>
          {list}
        </div>
        <div className={cn('total')}>
            <span>Итого</span> 
            <span>{totalPrice.toLocaleString()} &#8381;</span>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  card: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func.isRequired,
  active: propTypes.bool.isRequired,
  setActive: propTypes.func.isRequired
}

Card.defaultProps = {
  card: [],
  onItemDelete: () => {},
  active: true,
  setActive: () => {},
}

export default React.memo(Card);