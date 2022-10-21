import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numFormat } from "../../utils";
import "./style.css";

function Totals({totalPrice}) {
  const cn = bem("Totals");

  return (
    <div className={cn()}>
      <span className={cn("title")}>Итого:</span>
      <span className={cn("sum")}>
        {numFormat(totalPrice)}&nbsp;&#8381;
      </span>
    </div>
  );
}

Totals.propTypes = {
    totalPrice: propTypes.number.isRequired,
  };

export default React.memo(Totals);
