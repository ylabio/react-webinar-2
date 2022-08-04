import React from "react";
import "./style.css";
const Button = ({ children, ...props }) => (
  <button {...props} className="Button">
    {children}
  </button>
);
export default Button;
