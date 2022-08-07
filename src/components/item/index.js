import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getPriceOnRub} from '../../utils';
import './style.css';

function Item({item, indexItem, buttonName, onItemClick}) {
  const cn = bem('Item');

  const callbacks = {

    onClick: useCallback((e) => {
      e.stopPropagation();
      onItemClick(item.code)
    }, [onItemClick, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('name')}>
        <p className={cn('number')}>{indexItem}</p>
        <p className={cn('title')}>{item.title}</p>
      </div>
      <div className={cn('actions')}>
        <p className={cn('price')}>{getPriceOnRub(item.price)}</p>
        {item.count && <p className={cn('count')}>{item.count} шт</p>}
        <button onClick={callbacks.onClick}>
          {buttonName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  indexItem: propTypes.number.isRequired,
  buttonName: propTypes.string.isRequired,
  onItemClick: propTypes.func.isRequired,
}

Item.defaultProps = {
  item: {},
  indexItem: 1,
  buttonName: '',
  onItemClick: () => {},
}

export default React.memo(Item);
