import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls({title, onClick, children}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      {
        (children) && (
            <div className={cn('cart')}>
              {children}
            </div>
          )
      }
      <button onClick={onClick}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
  title: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  children: propTypes.node,
}

Controls.defaultProps = {
  title: 'Перейти',
  onClick: () => {}, // Значение по умолчанию - функция-заглушка
  
}

export default React.memo(Controls);
