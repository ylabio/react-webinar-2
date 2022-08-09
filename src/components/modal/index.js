import React from "react";
import Background from "../background";
import Layout from "../layout";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function Modal(props) {
  const cn = bem("Modal");

  return (
    <>
      <div className={cn()}>
        <Layout head={<h1>Корзина</h1>}>
          {props.children}
          <button className={cn("close")} onClick={props.onClose}>
            Закрыть
          </button>
        </Layout>
      </div>
      <Background onClick={props.onClose} />
    </>
  );
}

export default Modal;
