import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Button = ({ children, type, onClick }) => (
  <div>
    <button type={type} onClick={onClick} className="Button">
      {children}
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  children: PropTypes.node.isRequired,
};
