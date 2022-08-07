import React, {useCallback}  from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Controls({controlsText, controlsData, onControlButton, buttonText}){
  const cn = bem('Controls');

  const callbacks = {
    data: useCallback(() => {
        controlsData();
    }, [])
  };

  return (
    <div className={cn()}>
      <div className={controlsText ? cn('text') : cn('text_hidden')}>{controlsText}</div>
      <div className={cn('data')}>{controlsData}</div>
      <button onClick={onControlButton}>{buttonText}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
