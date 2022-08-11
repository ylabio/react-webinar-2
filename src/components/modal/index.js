import React from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
const cn = bem("Cart");

// Переиспользумый компонент Modal

const Modal = ({ top, footer, listArray }) => {
  return (
    <div className={cn("container")}>
      <div className={cn()}>
        <div className={cn("top")}>{top}</div>
        {listArray}
        <div className={cn("footer")}>
          <div className={cn("footer--total-price")}>{footer}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  top: propTypes.node.isRequired,
  footer: propTypes.node.isRequired,
  listArray: propTypes.node.isRequired,
};

export default React.memo(Modal);
