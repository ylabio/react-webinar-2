import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

function LayoutModal({ title, onClose, children }) {
  const cn = bem("LayoutModal");

  return (
    <div className={cn()}>
      <div className={cn("overlay")}>
        <div className={cn("head")}>
          <h1 className={cn("title")}>{title}</h1>
          <button className={cn("close")} onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className={cn("content")}>{children}</div>
      </div>
    </div>
  );
}

LayoutModal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
};

LayoutModal.defaultProps = {};

export default React.memo(LayoutModal);
