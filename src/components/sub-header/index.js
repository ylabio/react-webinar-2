import React from "react";
import BasketSimple from "../basket-simple";
import Menu from "../menu";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function SubHeader({ onOpenBasket, basketAmount, basketSum }) {
  const cn = bem("SubHeader");

  return (
    <div className={cn()}>
      <Menu />
      <BasketSimple
        onOpen={onOpenBasket}
        amount={basketAmount}
        sum={basketSum}
      />
    </div>
  );
}

export default SubHeader;
