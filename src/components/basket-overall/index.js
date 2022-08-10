import React from "react";
// import propTypes from "prop-types";
import "./style.css";

const BasketOverall = ({ overall }) => {
  return (
    <div className="basket__overall">
      <div>Итого</div> <span>{overall.toLocaleString()} ₽</span>
    </div>
  );
};

// BasketOverall.propTypes = {
//   overall: propTypes.number.isRequired,
// };

export default React.memo(BasketOverall);
