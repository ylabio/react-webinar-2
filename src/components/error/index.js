import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Error(props) {
  const cn = bem("Error");

  return (
    <div className={cn()}>
      {props.errors.map((item, index) => (
        <div key={index} className={cn("item")}>
          {item.message}
        </div>
      ))}
    </div>
  );
}
Error.propTypes = {
  errors: propTypes.arrayOf(propTypes.object).isRequired,
};

Error.defaultProps = {
  errors: [],
};

export default React.memo(Error);
