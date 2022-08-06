import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, action}) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {`${item.price} \u20BD`}
      </div>
      {
        item.count
        ? <div className={cn('count')}>{`${item.count} шт`}</div>
        : null
      }
      <div className={cn('actions')}>
        <button onClick={() => action.callback(item.code)}>
          {action.actionName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  action: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  action: () => {}
}

export default React.memo(Item);
