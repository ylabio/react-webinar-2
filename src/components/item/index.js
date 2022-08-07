import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, onButtonClick}) {
  const cn = bem('Item');
  const formattedPrice = item.price.toLocaleString('ru-RU');
  const formattedAmount = item.amount ? item.amount.toLocaleString('ru-RU') : null;
  const buttonValues = {
    main: 'Добавить',
    cart: 'Удалить'
  }

  const callbacks = {
    onButtonClick: useCallback(() => {
      onButtonClick(item)
    }, [onButtonClick, item])
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {item.code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('info')}>
        {formattedPrice} &#8381; {item.amount ? <span className={cn('amount')}>{formattedAmount} шт</span> : ''}
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={callbacks.onButtonClick}>
          {item.amount ? buttonValues.cart : buttonValues.main}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onButtonClick: propTypes.func
}

Item.defaultProps = {
  onButtonClick: () => {}
}

export default React.memo(Item);
