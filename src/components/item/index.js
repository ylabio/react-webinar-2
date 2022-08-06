import React, { useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const [count, setCount] = useState(0);

  return (
    <div className={cn('')}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <span className={cn('Prise')}>{`${props.priceFormation(props.item.price)}`} &#x20bd;</span>
        <button onClick={(e) => props.onAdd(props.item.code, props.item.title, props.item.price, props.item.amount)}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired
}

Item.defaultProps = {
  onAdd: () => { },
  priceFormation: () => { },
}

export default React.memo(Item);
