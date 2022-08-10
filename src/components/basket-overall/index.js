import React from "react";
import "./style.css";

const BasketOverall = ({ overall }) => {
  return (
    <div className="basket__overall">
      <div>Итого</div> <span>{overall.toLocaleString()} ₽</span>
    </div>
  );
};

export default React.memo(BasketOverall);
