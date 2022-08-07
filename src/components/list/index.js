import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item/item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onSelect={props.onItemSelect} onPutItemToBasket={props.onPutItemToBasket}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onPutItemToBasket: propTypes.func
}

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onPutItemToBasket: () => {}
}

export default React.memo(List);
