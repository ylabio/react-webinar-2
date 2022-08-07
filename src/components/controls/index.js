import React, { memo } from "react";
import "./style.css";
import Button from "../button";
import propTypes from "prop-types";
import BasketDisplay from "../basket-display";

function Controls({ callbacks, basketData }) {
  const [openModal] = callbacks;

  return (
    <div className="Controls">
      <BasketDisplay
        amount={basketData.itemsAmount}
        price={basketData.itemsPrice}
      />
      <Button onClick={openModal} label="Перейти" />
    </div>
  );
}

Controls.propTypes = {
  callbacks: propTypes.arrayOf(propTypes.func).isRequired,
};

export default memo(Controls);
