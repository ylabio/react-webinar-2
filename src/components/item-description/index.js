import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ItemDescription(props) {
  const cn = bem('ItemDescription');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn('wraper')}>
      <div className={cn('description')}>
        <p>{props.item.description}</p>
      </div> 
      <div className={cn('country')}>
        <p>Страна производитель: <span className={cn('value')}>{props.item.maidIn && props.item.maidIn.title}</span></p>
      </div> 
      <div className={cn('category')}>
        <p>Категория: <span className={cn('value')}>{props.item.category && props.item.category.title}</span></p>
      </div> 
      <div className={cn('edition')}>
        <p>Год: <span className={cn('value')}>{props.item.edition}</span></p>
      </div>
      <div className={cn('price')}>
        <p>Цена: <span className={cn('value')}>{numberFormat(props.item.price)} ₽</span></p>
      </div>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ItemDescription.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ItemDescription);
