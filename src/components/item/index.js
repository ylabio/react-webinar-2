import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const getButtonName = () => {
    return !props.isCardShow ? 'Добавить' : 'Удалить'
  }

  return (
    <div className={cn({'selected': props.item.selected})}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
         {new Intl.NumberFormat("ru", {style: "currency", currency: "RUB"}).format(props.item.price)}
      </div>
      {props.item.count ? <div className={cn('count')}>
        {props.item.count} шт 
      </div> : null}
      <div className={cn('actions')}>
      <button onClick={() => props.cardActive(props.item.code)}>
          {getButtonName()}
        </button> 
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  cardActive: propTypes.func,
}

Item.defaultProps = {
  item: {},
  cardActive: () => {},
}

export default React.memo(Item);
