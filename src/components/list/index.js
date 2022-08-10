import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import ItemCart from "../item-cart";
import './style.css';

function List(props) {

  const cn = bem('List');


  return (
    <div className={cn()}>
      {props.items.map(item =>
      !props.isCart ? 
        <div key={item.code} className={cn('item')}>
          <Item item={item}
          onButton={props.onButton}
          buttonText={props.buttonText}/>
        </div> :
        <div key={item.code} className={cn('item')}>
          <ItemCart item={item}
          onButton={props.onButton}
          buttonText={props.buttonText}/>
        </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object),
  isCart: propTypes.bool,
  onButton: propTypes.func.isRequired,
  buttonText: propTypes.string.isRequired
}

List.defaultProps = {
  items: [],
  isCart: false
}

export default React.memo(List);
