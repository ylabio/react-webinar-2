import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import Controls from '../controls';

function Item({ item, butText, butAction }) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')} >
        {item.price.toLocaleString('ru')} ₽
      </div>
      {item.number &&
        <div className={cn('number')}>
          {item.number} шт
        </div>
      }
      <Controls text={butText} action={() => butAction(item.code)} />
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  butText: propTypes.string.isRequired,
  butAction: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  butText: "",
  butAction: () => { }
}

export default React.memo(Item);
