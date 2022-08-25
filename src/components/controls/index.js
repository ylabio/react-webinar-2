import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from "@bem-react/classname";

const cn = bem('Controls');

function Controls({ onAdd }) {
  return (
    <div className={cn()}>
      <button className={cn('button')} onClick={onAdd}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);