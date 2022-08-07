import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Пункт списка
 * @param props
 * @param {function} props.callback Ивент для кнопки
 * @param {String} props.callbackName Надпись для кнопки
 * @param {Object} props.item Объект пункта
 * @return {React.ReactElement} Виртуальные элементы React
 */

function Item(props) {
  const cn = bem('Item');
  const {callback, item, callbackName} = props;

  const handleCallback = useCallback(() => {
    callback(item.code);
  }, [callback, item]);

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price.toLocaleString('ru-Ru')} ₽
      </div>
      <div className={cn('amount')}>
        {item.amount}
      </div>
      <div className={cn('actions')}>
        <button onClick={handleCallback}>
          {callbackName}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callbackName: propTypes.string.isRequired,
  callback: propTypes.func.isRequired,
}

Item.defaultProps = {
  item: {},
  callbackName: '',
  callback: () => {},
}

export default React.memo(Item);
