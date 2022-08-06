import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({ items, button, buttonText }) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} index={index + 1} button={button} buttonText={buttonText}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  button: propTypes.func,
  buttonText: propTypes.string
}

List.defaultProps = {
  items: [],
  button: () => {},
  buttonText: 'Кнопка'
}

export default React.memo(List);
