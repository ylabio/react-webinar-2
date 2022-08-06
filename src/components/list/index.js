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
        <Item
            quantity={item?.quantity}
            item={item}
            text={props.text}
            onClick={props.onClick}
        />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onClick: propTypes.func.isRequired,
  text: propTypes.string,
};

List.defaultProps = {
  items: [],
  onClick: () => {},
  text: "",
};

export default React.memo(List);
