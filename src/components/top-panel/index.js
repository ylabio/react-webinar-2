import React from "react";
import BasketSimple from "../basket-simple";
import Menu from "../menu";
import "style.css"

function TopPanel({onOpen , amount , sum}) {

    return(
        <div className="TopPanel">
            <Menu />
            <BasketSimple onOpen={onOpen} 
                          amount={amount}
                          sum={sum}   
            />
        </div>
    )
}

export default React.memo(TopPanel)