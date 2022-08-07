import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';



function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item=>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onAddItem={props.onItemAdd}  onItemDelete={props.onItemDelete}  openedModal={props.openedModal}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onItemAdd: propTypes.func,
  onItemDelete: propTypes.func,
  openedModal:propTypes.bool
};

List.defaultProps = {
  items: [],
  onItemAdd: () => {},
  onItemDelete: () => {}
};

export default React.memo(List);
