import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';
import Controls from '../controls';

function Modal({ name, modalActive, setModalActive, content }) {
  const cn = bem('Modal');

  return (
    <div className={cn("wrapper", {
      ['active']: modalActive
    })}
      onClick={() => setModalActive(false)}>
      <div className={cn()}
        onClick={(e) => e.stopPropagation()}>
        <div className={cn("head")}>
          <h1>{name}</h1>
          <Controls action={() => setModalActive(false)} text='Закрыть' />
        </div>
        {content}
      </div>
    </div>
  )
}

Modal.propTypes = {
  modalActive: propTypes.bool.isRequired,
  setModalActive: propTypes.func.isRequired,
  name: propTypes.string
}

Modal.defaultProps = {
  name: ""
}

export default React.memo(Modal);
