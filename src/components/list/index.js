import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, onButtonClick}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <Item item={item}
              onButtonClick={onButtonClick}
              index={index + 1}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onButtonClick: propTypes.func
}

List.defaultProps = {
  onButtonClick: () => {}
}


export default React.memo(List);
