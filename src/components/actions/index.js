import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

/*
 *  Действие для родительского компонента
 *  @param action {Function} Функция для исполнения действия
 *  @param name {string} Название действия
 *  @return {React.ReactElement} Виртуальный элемент React
*/
function Actions(props){

  const {action, name} = props;

  const cn = bem('Actions')

  return (
    <div className={cn('')}>
        <button onClick={action} className={cn('button')}>
          {name}
        </button>
    </div>
  )
}

Actions.propTypes = {
  action: propTypes.func.isRequired,
  name: propTypes.string.isRequired
}

Actions.defaultProps = {
  action: () => {},
  name: ''
}

export default Actions;
