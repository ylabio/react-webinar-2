import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  const items = props.items

  const getItems = () => {
    let elements = [];
    for (let prop in items) {
      elements.push(
        <div key={prop} className={cn('item')}>
          <Item item={items[prop]}
                count={+prop}
                actionName="Добавить"
                action={() => props.addToCart(prop)}/>
        </div>);     
    }
    return elements;
  }

  return (
    <div className={cn()}>

      { getItems() }

    </div>
  )
}

List.propTypes = {
  items: propTypes.objectOf(propTypes.object).isRequired,
  addToCart: propTypes.func
}

List.defaultProps = {
  items: {},
  addToCart: () => {}
}

export default React.memo(List);
