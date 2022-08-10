import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

const ModalHeader = ({ modalName, showModal }) => {
  const cn = bem("Modal-header");
  return (
    <div className={cn("content-header")}>
      <h2>{modalName}</h2>
      <button onClick={() => showModal()}>Закрыть</button>
    </div>
  );
};

ModalHeader.propType = {
  showModal: propTypes.func,
  modalName: propTypes.string,
};

ModalHeader.defaultProps = {
  showModal: () => {},
  modalName: "",
};

export default ModalHeader;
