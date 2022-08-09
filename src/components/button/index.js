import React from "react";
import "./style.css";

const Button = ({ children, type, onClick }) => (
  <div>
    <button type={type} onClick={onClick} className="Button">
      {children}
    </button>
  </div>
);

export default Button;
