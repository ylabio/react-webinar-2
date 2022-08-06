import React, { useCallback } from 'react';
import Actions from './../actions';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props){
  const cn = bem('Item');

  const {item, callback, index} = props;

  const handleCallback = useCallback(() => {
    callback.action(item);
  }, [callback.action, item]);

  return (
    <div className={cn()}>
      <div className={cn('number')}>{index}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price.toLocaleString('ru-Ru')}</div>
      <Actions action={handleCallback} name={callback.name}>
        {`${item.count ? item.count + ' шт' : ''}`}
      </Actions>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
};

Item.defaultProps = {
  item: {},
  callback: { action: () => {}, name: '' },
  index: 0,
};

export default React.memo(Item);
