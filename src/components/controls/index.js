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
  controlsText: propTypes.string.isRequired,
  controlsData: propTypes.string.isRequired,
  onControlButton: propTypes.func.isRequired,
  buttonText: propTypes.string.isRequired
}

export default React.memo(Controls);
