import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function ModalHeader({toggleModalShow, title}) {
  const cn = bem('Modal-header');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <button onClick={toggleModalShow}>Закрыть</button>
    </div>
  )
}

ModalHeader.propTypes = {
  toggleModalShow: propTypes.func.isRequired,
  title: propTypes.string
}

ModalHeader.defaultProps = {
  title: 'Заголовок'
}

export default React.memo(ModalHeader);