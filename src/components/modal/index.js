import React from "react";
import Background from "../background";
import Layout from "../layout";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Modal({ children, onClose }) {
  const cn = bem("Modal");

  return (
    <>
      <div className={cn()}>
        <Layout head={<h1>Корзина</h1>}>
          {children}
          <button className={cn("close")} onClick={onClose}>
            Закрыть
          </button>
        </Layout>
      </div>
      <Background onClick={onClose} />
    </>
  );
}

Modal.propTypes = {
  children: propTypes.node,
  onClose: propTypes.func.isRequired,
};

export default React.memo(Modal);
