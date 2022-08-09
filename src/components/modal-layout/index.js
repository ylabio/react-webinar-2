import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

const ModalLayout = ({ modalName, showModal }) => {
  const cn = bem("Modal-layout");
  return (
    <div className={cn("content-header")}>
      <h2>{modalName}</h2>
      <button onClick={() => showModal()}>Закрыть</button>
    </div>
  );
};

ModalLayout.propType = {
  showModal: propTypes.func,
  modalName: propTypes.string,
};

ModalLayout.defaultProps = {
  showModal: () => {},
  modalName: "",
};

export default ModalLayout;
