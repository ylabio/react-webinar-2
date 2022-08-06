import React from "react";
import propTypes from "prop-types";
import "./style.css";
const Button = ({ children, ...props }) => (
  <button {...props} className="Button">
    {children}
  </button>
);

Button.propTypes = {
  children: propTypes.node.isRequired,
  props: propTypes.object.isRequired,
};

Button.defaultProps = {
  props: {},
};
export default Button;
