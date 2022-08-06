import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const {item, callbackButton, index} = props;

  const handleCallback = useCallback(() => {
    callbackButton.action(item)
  }, [callbackButton, item]);

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {index}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price.toLocaleString('ru-Ru')}
      </div>
      <div className={item.count && 'Item-count'}>
        {item.count}
      </div>
      <div className={cn('actions')}>
        <button onClick={handleCallback} className={cn('button')}>
          {callbackButton.name}
        </button>
      </div>
    </div>
  )
};

Item.propTypes = {
  item: propTypes.object.isRequired,
  callbackButton: propTypes.object.isRequired,
  index: propTypes.number.isRequired
};

Item.defaultProps = {
  item: {},
  callbackButton: {action: () => {}, name: ''},
  index: 0
};

export default React.memo(Item);
