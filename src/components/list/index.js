import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item ')}>
        <Item item={item} btnClick={props.btnClick} btnLabbel={props.btnLabbel}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  btnClick: propTypes.func,
  btnLabbel: propTypes.string.isRequired
}

List.defaultProps = {
  items: [],
  btnClick: () => {},
  btnLabbel: 'Button'
}

export default React.memo(List);
