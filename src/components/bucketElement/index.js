import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BucketElement(props) {
  const cn = bem('BucketElement');

  const callbacks = {
    onDeleteBucket: useCallback(() => {
      props.onDeleteBucket(props.item.code);
    }, [props.onDeleteBucket, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>

        <p> {props.item.title}</p>

        <p className={cn('info')}>
          {new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0}).format(props.item.price)}

          <p>{props.item.amount} шт</p>
          
        </p>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDeleteBucket}>Удалить</button>
      </div>
    </div>
  );
}

BucketElement.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteBucket: propTypes.func,
};

BucketElement.defaultProps = {
  onDeleteBucket: () => {},
  item: {},
};

export default React.memo(BucketElement);
