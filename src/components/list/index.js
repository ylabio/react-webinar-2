import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from './../item';
import {types} from './../../utils'
import './style.css';

/*
* @param items {arrayOf(object)}
* @param callback {objectOf(Function, string)} Объект с функцией и названием обработчика на кнопку (additem или deleteItem)
* @return {React.ReactElement} Виртуальные элементы React
*/
function List(props) {
  const {items, callback} = props;

  const cn = bem('List');

  return (
    <ul className={cn()}>{items.map((item, index) =>
      <li key={item._id || item.code} className={cn('item')}>
        <Item item={item} callback={callback} index={index + 1}/>
      </li>
    )}
    </ul>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  callback: propTypes.shape(types.CallbackPropsShape).isRequired,
}

List.defaultProps = {
  items: [],
  callback: {action: () => {}, name: ''},
}

export default React.memo(List);
