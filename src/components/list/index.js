import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item}
          countClass={ props.countClass}
          btnHandler={props.btnHandler}
          btnText={props.btnText}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  btnHandler: propTypes.func.isRequired,
  btnText: propTypes.string.isRequired,
}

List.defaultProps = {
  items: [],
  btnText: 'Нажми меня',
  btnHandler: () => { },
}

export default React.memo(List);
