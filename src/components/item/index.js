import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Button from '../button';

function Item({ item, title, callBack }) {
  const cn = bem('Item');
  const callbacks = {
    onClick: useCallback(() => {
      callBack(item.code)
    }, [])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        <div>
          {item.title}
        </div>
        <p>
          {item.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 })}
        </p>
      </div>
      <div className={cn('actions')}>
        <Button title={title} callBack={callbacks.onClick} />
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callBack: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
}



export default React.memo(Item);
