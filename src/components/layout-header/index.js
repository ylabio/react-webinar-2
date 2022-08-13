import React, { useCallback } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { cn as bem } from "@bem-react/classname";
import BasketSimple from "../../components/basket-simple";
import Menu from "../../components/menu";
import "./style.css";

function LayoutHeader() {
  const cn = bem("LayoutHeader");

  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
  };

  return (
    <div className={cn()}>
      <Menu />
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
    </div>
  );
}

export default React.memo(LayoutHeader);
