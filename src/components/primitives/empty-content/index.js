import React from "react";
import propTypes from "prop-types";
import "./style.css";

function EmptyContent({ children }) {
  return <div className="Empty-wrapper">{children}</div>;
}

EmptyContent.propTypes = {
  children: propTypes.element.isRequired,
};

export default React.memo(EmptyContent);
