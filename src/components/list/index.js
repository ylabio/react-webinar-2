import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item}
        itemNumber={props.type === 'cart' ? props.items.indexOf(item, 0)+1 : item.code}
        title={item.title}
        secondaryInfo={props.type === 'cart' 
        ? <>
            <div>{(item.price).toLocaleString('ru-RU',{style:'currency', currency:'RUB',maximumFractionDigits: 0})}</div>
            <div>{`${item.qty} шт`}</div>
          </>
        : <div>{(item.price).toLocaleString('ru-RU',{style:'currency', currency:'RUB',maximumFractionDigits: 0})}</div>}
        buttonAction={props.callback} 
        buttonValue={props.type === 'cart' ? 'Удалить' : 'Добавить'}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  type: propTypes.string,
  callback: propTypes.func
}

List.defaultProps = {
  items: [],
  callback: () => {}
}

export default React.memo(List);
