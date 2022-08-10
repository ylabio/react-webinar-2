import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List(props) {
  const cn = bem('List');

  if (props.items.length === 0) {
    return <div className={cn('empty')}>Товары в магазине отсутствуют</div>
  }

  return (
    <div className={cn()}>
      {props.items.map(props.renderItem)}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func.isRequired
}

export default React.memo(List);
