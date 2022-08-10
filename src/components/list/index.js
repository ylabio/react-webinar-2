import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({ items, countClass, btnHandler, btnText }) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item}
          countClass={countClass}
          btnHandler={btnHandler}
          btnText={btnText}
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
  countClass: propTypes.string.isRequired,
}

List.defaultProps = {
  items: [],
  btnText: 'Нажми меня',
  btnHandler: () => { },
  countClass: 'Item-count',
}

export default React.memo(List);
