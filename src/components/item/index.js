import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Button} from '../ui/button';
import {getFormattedPrice} from '../../utils';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const callbacks = {
    onButtonClick: useCallback(() => {
      props.onButtonClick(props.item)
    }, [props.onButtonClick, props.item])
  }

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {getFormattedPrice(props.item.price)} 
      </div>
      {/* Проверяем на наличие поля amount для корзины */}
      {props.item.amount ? 
        <div className={cn('amount')}>
          {`${props.item.amount} шт`}
        </div>
      : 
        null}
      <div className={cn('actions')}>
        <Button onClick={callbacks.onButtonClick}>
          {props.buttonText}
        </Button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  buttonText: propTypes.string.isRequired,
  onButtonClick: propTypes.func.isRequired
}

Item.defaultProps = {
  item: {},
  buttonFunc: () => {}
}

export default React.memo(Item);
