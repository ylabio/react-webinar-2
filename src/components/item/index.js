import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, onSelect, onDelete}) {

  console.log('Item');

  const cn = bem('Item');

  return (
    <div className={cn({'selected': item.selected})} onClick={() => onSelect(item.code)}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('actions')}>
        <button onClick={() => onDelete(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);
