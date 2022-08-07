import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutModal(props) {
  const cn = bem('LayoutModal');
  return (
    <div className={cn()}>
      <div className={cn('frame')}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>
            {props.title}
          </h1>
          <button className={cn('close')} onClick={props.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

LayoutModal.defaultProps = {
  title: 'Модалка',
  onClose: () => {}
};

export default React.memo(LayoutModal);
