import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import BasketSimple from "../basket-simple";
import Menu from "../menu";

function BasketHead({ sum, amount, onOpen }) {
  const cn = bem("BasketHead");
  return (
    <div className={cn()}>
      <Menu />
      <BasketSimple onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  );
}

BasketHead.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketHead.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(BasketHead);
