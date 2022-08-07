import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, handleAddItemToCart}) {
  const cn = bem('Item');

  return (
    <div className={cn({'selected': item.selected})}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        {/*&nbsp - это неразрывный пробел(иначе, при обычном пробеле идет перенос строки)*/}
        <span className={cn('price')}>{item.price}&nbsp;₽</span>
        <button onClick={()=>handleAddItemToCart(item)}>Добавить</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
}

Item.defaultProps = {
}

export default React.memo(Item);
