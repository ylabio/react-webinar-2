import propTypes from "prop-types";
import React from 'react';
import './style.css';

function Modal(props) {
  return (
    <div className={props.active? "Modal active" : "Modal"} onClick={()=>props.setActive(false)}>
      <div className={props.active? "Modal-content active" : "Modal-content"} onClick={e => e.stopPropagation()}>
        <div>
          <button className="Modal-close" onClick={()=>props.setActive(false)}>Закрыть</button>
          {props.children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: propTypes.bool.isRequired,
  setActive: propTypes.func.isRequired,
  children: propTypes.node,
}

Modal.defaultProps = {
}

export default React.memo(Modal);