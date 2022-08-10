import React from "react";
import propTypes from "prop-types";
import "./style.css";
import {cn as bem} from "@bem-react/classname";

function Total(props) {
  const cn = bem("Total");

  return (
    props.total
      ? <div className={cn()}>
        <span>Итого</span>
        <span>{props.total.toLocaleString("ru") + " ₽"}</span>
      </div>
      : null
  );
}

Total.propTypes = {
  total: propTypes.number.isRequired,
};

Total.defaultProps = {
  total: 0,
};

export default React.memo(Total);