import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemInfo(props) {
  const cn = bem('ItemInfo');

  return (
    <div className={cn('container')}>
        <div className={cn('description')}>{props.item.description}</div>
        <div className={cn('country')}>Страна производитель: <span className={cn('itemInfo')}>{props.itemCountry} ({props.itemCountryCode})</span></div>
        <div className={cn('category')}>Категория: <span className={cn('itemInfo')}>{props.itemCategory}</span></div>
        <div className={cn('year')}>Год выпуска: <span className={cn('itemInfo')}>{props.item.edition}</span></div>
        <div className={cn('price')}>Цена: {Number(props.item.price).toLocaleString('ru-RU')} ₽</div>
        <button onClick={props.onAdd}>Добавить</button>
     </div>
  )
}

ItemInfo.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

ItemInfo.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(ItemInfo);
