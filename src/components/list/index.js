import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

/**
 * Список
 * @param props
 * @param {function} props.callback Ивент для кнопки
 * @param {Object[]} props.items Массив с товарами для главной страницы
 * @param {String} props.callbackName Надпись для кнопки
 * @return {React.ReactElement} Виртуальные элементы React
 */
function List(props) {
  const cn = bem('List');
  const {callbackName, callback, items} = props;

  return (
    <ol className={cn()}>{items.map(item =>
      <li key={item.code} className={cn('item')}>
        <Item
          item={item}
          callbackName={callbackName}
          callback={callback}
        />
      </li>
    )}
    </ol>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  callbackName: propTypes.string.isRequired,
  callback: propTypes.func.isRequired,
}

List.defaultProps = {
}

export default React.memo(List);
