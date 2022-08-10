import React from 'react';
import propTypes, { number } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Total(props) {
  const cn = bem('Total');

  return (
    <div className={cn()}>
        <b>Итого</b>
        <b>{props.total.toLocaleString('ru-RU')} ₽</b>
    </div>
  )
}

Total.propTypes = {
  total: propTypes.number.isRequired
}

Total.defaultProps = {
  total: null,
}

export default React.memo(Total);
