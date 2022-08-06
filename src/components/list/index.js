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
              getAllCount={props.getAllCounts}
              btn={props.btn}
              showCountItem={props.showCountItem}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  btn: propTypes.string,
  onBtn: propTypes.func.isRequired,
  showCountItem: propTypes.bool,
  getAllCounts: propTypes.func.isRequired,
}

List.defaultProps = {
  btn: '',
  showCountItem: false,
  onBtn: () => {},
  getAllCounts: () => {},
}

export default React.memo(List);
