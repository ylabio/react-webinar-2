import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {getTotal} from '../../utils';

function Total(props) {
  const cn = bem('Total');
  const total = getTotal(props.items).toLocaleString('ru-RU');

  return (
    <div className={cn()}>
        <b>Итого</b>
        <b>{total} ₽</b>
    </div>
  )
}

Total.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired
}

Total.defaultProps = {
  items: [],
}

export default React.memo(Total);
