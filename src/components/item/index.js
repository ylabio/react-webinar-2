import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onClick: useCallback(() => {
      props.callBack(props.item)
    }, [])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        <div>
          {props.item.title}
        </div>
        <p>
          {props.item.price} ₽
          {
            props.item.count ?
              <span className={cn('count')}>
                {props.item.count} шт
              </span>
              :
              null
          }
        </p>
      </div>
      <div className={cn('actions')}>
        <Button title={props.title} callBack={callbacks.onClick} />
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callBack: propTypes.func.isRequired,
  title: propTypes.node.isRequired,
}

Item.defaultProps = {
  callBack: () => { },
  item: {},
}

export default React.memo(Item);
