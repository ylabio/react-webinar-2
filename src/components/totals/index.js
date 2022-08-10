import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numFormat, totalPrice } from "../../utils";
import "./style.css";

function Totals({cart}) {
  const cn = bem("Totals");

  return (
    <div className={cn()}>
      <span className={cn("title")}>Итого:</span>
      <span className={cn("sum")}>
        {numFormat(totalPrice(cart))}&nbsp;&#8381;
      </span>
    </div>
  );
}

Totals.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
  };

export default React.memo(Totals);
