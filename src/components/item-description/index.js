import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemDescription(props) {  
  const cn = bem('ItemDescription');

  return ( 
    <div className={cn()}>
      <div className={cn('element')}>{props.item.description}</div> 
      <div className={cn('element')}>
        Страна производитель: <span>{props.item.maidIn.title} ({props.item.maidIn.code})</span>
      </div>
      <div className={cn('element')}>
        Категория: <span>{props.item.category.title}</span>
      </div>
      <div className={cn('element')}>
        Год выпуска: <span>{props.item.edition}</span>
      </div>
      <div className={cn('element')}>
        <span className={cn('price')}>Цена:&nbsp;&nbsp;{props.item.price} ₽</span>
      </div>
      <button onClick={() => props.onAdd(props.item._id)}>Добавить</button>
    </div>
  );
}

ItemDescription.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired
}

export default React.memo(ItemDescription);