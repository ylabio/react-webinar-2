import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import ItemCart from "../item-cart";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        {props.onCart
          ? <ItemCart item={item} onClick={props.onClickButton}/>
          : <Item item={item} onClick={props.onClickButton}/>
        }
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  onCart: propTypes.bool,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onClickButton: propTypes.func
}

List.defaultProps = {
  onCart: false,
  onClickButton: () => {}
}

export default React.memo(List);
