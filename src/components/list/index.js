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
              onItemAction={props.onItemAction}
              btnTxt={props.btnTxt}
              />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemAction: propTypes.func,
  btnTxt: propTypes.string.isRequired
}

List.defaultProps = {
  items: [],
  onItemAction: () => {}
}

export default React.memo(List);