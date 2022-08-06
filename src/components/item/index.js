import React, {useCallback} from 'react';
import Actions from './../actions';
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
      <Actions action={handleCallback} name={callbackButton.name}/>
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
