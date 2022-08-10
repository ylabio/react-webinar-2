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
        <Item item={item} onItemAdd={props.onItemAdd}  onItemDelete={props.onItemDelete}/>
      </div>
    )}
    </div>
  )
}


List.propTypes = {
  onItemAdd: propTypes.func.isRequired,
  onItemDelete: propTypes.func,


};

List.defaultProps = {
  onItemAdd: () => {},
  onItemDelete: () => {}
};

export default React.memo(List);
