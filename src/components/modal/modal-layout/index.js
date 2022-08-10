import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

/**
 * Структурой и логикой компонента вдохновлялся видосом на ютубе от Ulbi TV
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Modal(props) {

  const cn = bem('Modal');

  const callbacks = {

    onChangeActive: React.useCallback(() => {
      props.setActive(false);
    }, [props.setActive]),

    onContentClick: React.useCallback(e => {
      e.stopPropagation()
    }, []),

  };

  return (
    <div className={props.isActive ? cn() + ' Active' : cn()} onClick={callbacks.onChangeActive}>
      <div className={props.isActive ? cn('layout') + ' Active' : cn('layout')} onClick={callbacks.onContentClick}>
        <div className={cn('head')}>
          {props.head}
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
        <div className={cn('foot')}>
          {props.foot}
        </div>
      </div>
    </div>
  );

};

Modal.propTypes = {
  isActive: propTypes.bool.isRequired,
  children: propTypes.node,
  head: propTypes.node,
  foot: propTypes.node
}

export default React.memo(Modal);