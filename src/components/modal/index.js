import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Layout from "../layout";
import LayoutHead from "../layout/layout-head";

function Modal({ closeModal, children }) {
  const cn = bem("Modal");

  return (
    <div className={cn()} onClick={closeModal}>
      <div className={cn("content")}>
        <Layout
          head={
            <LayoutHead
              head={<h1>Корзина</h1>}
              textButton={"Закрыть"}
              handlerClick={closeModal}
            />
          }
        >
          {children}
        </Layout>
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: propTypes.func,
  children: propTypes.node,
};

Modal.defaultProps = {
  closeModal: () => {},
};

export default React.memo(Modal);
