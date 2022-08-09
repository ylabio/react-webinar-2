import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from './../item';
import { types } from './../../utils';
import './style.css';

/*
 * @param items {arrayOf(object)}
 * @param callback {objectOf(Function, string)} Объект с функцией и названием обработчика на кнопку (additem или deleteItem)
 * @param component {React.ReactElement} Виртуальный элемент React, для рендера списка переданного элемента
 * @return {React.ReactElement} Виртуальные элементы React
 */
function List(props) {
  const { items, callback, component: ItemComponent } = props;

  const cn = bem('List');

  return (
    <ul className={cn()}>
      {items.map((item) => (
        <li key={item._id || item.code} className={cn('item')}>
          <ItemComponent item={item} callback={callback} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  callback: propTypes.shape(types.CallbackPropsShape).isRequired,
  component: propTypes.instanceOf(Object).isRequired,
};

List.defaultProps = {
  items: [],
  callback: { action: () => {}, name: '' },
  component: Item,
};

export default React.memo(List);
