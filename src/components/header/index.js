import React from "react";
import Menu from "../menu";
import BasketSimple from "../basket-simple";
import "./styles.css";

const Header = ({openModalBasket, amount, sum}) => {
    return (
        <div className="Header">
            <Menu />
            <BasketSimple onOpen={openModalBasket} amount={amount} sum={sum}/>
        </div>
    )
}

export default React.memo(Header);