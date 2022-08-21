import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function FormInput({ label, className, ...restProps }) {
  const cn = bem("Input");

  return (
    <div className={cn()}>
      <input
        className={`${cn("field")} ${className}`}
        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
      />
      <label className={cn("label")}>{label}</label>
    </div>
  );
}

FormInput.propTypes = {
  value: propTypes.string,
  type: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
};

FormInput.defaultProps = {
  value: "",
  onChange: () => {},
  type: "text",
  placeholder: "",
};

export default React.memo(FormInput);
