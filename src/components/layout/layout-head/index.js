import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

function LayoutHeader({ head, textButton, handlerClick }) {
  const cn = bem("LayoutHeader");
  return (
    <div className={cn()}>
      <div className={cn("header")}> {head}</div>
      {textButton ? (
        <button className={"button"} onClick={handlerClick}>
          {textButton}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

LayoutHeader.propTypes = {
  head: propTypes.node.isRequired,
  handlerClick: propTypes.func,
  textButton: propTypes.string,
};

LayoutHeader.defaultProps = {};

export default React.memo(LayoutHeader);
