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
        <Item onCart={props.onCart} item={item} onClick={props.onClickButton}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  onCart: propTypes.bool.isRequired,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onClickButton: propTypes.func.isRequired
}

List.defaultProps = {
  onCart: false,
  items: [],
  onClickButton: () => {}
}

export default React.memo(List);
