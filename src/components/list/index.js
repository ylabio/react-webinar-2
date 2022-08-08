import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <Item item={item}
              index={index}
              onBtnItems={props.onBtn}
              btn={props.btn}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  btn: propTypes.string,
  onBtn: propTypes.func.isRequired,
}

List.defaultProps = {
  items: [],
  btn: '',
  onBtn: () => {},
}

export default React.memo(List);
