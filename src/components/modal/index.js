import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  return (
    <div className={cn()}>
      {props.content}
    </div>
)
}

Modal.propTypes = {
  content: propTypes.node,
}

Modal.defaultProps = {
  content: <div/>
}

export default React.memo(Modal);