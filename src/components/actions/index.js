import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

/*
 *  Действие для родительского компонента
 *  @param action {Function} Функция для исполнения действия
 *  @param name {string} Название действия
 *  @param children {any} Элемент который можно передать через children
 *  @return {React.ReactElement} Виртуальный элемент React
 */
function Actions(props) {
  const { action, name, children } = props;

  const cn = bem('Actions');

  return (
    <div className={cn('')}>
      {children}
      <button onClick={action} className={cn('button')}>
        {name}
      </button>
    </div>
  );
}

Actions.propTypes = {
  action: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.string,
    propTypes.element,
    propTypes.bool,
  ]),
};

Actions.defaultProps = {
  action: () => {},
  name: '',
  children: <></>,
};

export default React.memo(Actions);
