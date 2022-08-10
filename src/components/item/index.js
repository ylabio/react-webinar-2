import React, { useCallback } from 'react';
import Actions from './../actions';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const { item, callback } = props;

  const handleCallback = useCallback(() => {
    callback.action(item.code);
  }, [callback.action, item]);

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price.toLocaleString('ru-Ru')}</div>
      <Actions action={handleCallback} name={callback.name} />
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.object.isRequired,
};

export default React.memo(Item);
