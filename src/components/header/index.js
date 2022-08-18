import React from "react";
import BasketSimple from "../basket-simple";
import Nav from "../nav";
import "./styles.css";

function Header({ onOpen, amount, sum }) {
  return (
    <div className="Header">
      <Nav />
      <BasketSimple onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  );
}

export default Header;
