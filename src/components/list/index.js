import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({
  items,
  handleBtn,
  btnText
}) {
  const cn = bem('List');
  const key = Math.random()

  return (
    <div className={cn()}>{items.map(item =>
      <div key={`${key} ${item.code}`} className={cn('item')}>
        <Item item={item} handleBtn={handleBtn} btnText={btnText}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  handleBtn: propTypes.func,
  btnText: propTypes.string
}

List.defaultProps = {
  handleBtn: () => {},
  btnText: "Добавить"
}

export default React.memo(List);
