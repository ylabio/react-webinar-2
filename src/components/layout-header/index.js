import React, { useCallback } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { cn as bem } from "@bem-react/classname";
import BasketSimple from "../../components/basket-simple";
import Menu from "../../components/menu";
import "./style.css";
import Select from "../select";

function LayoutHeader() {
  const cn = bem("LayoutHeader");

  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.localization.current,
    lang: state.localization.lang,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    changeLng: useCallback((lng) => store.get("localization").select(lng), []),
  };

  return (
    <div className={cn()}>
      <Menu />
      <Select
        value={select.current}
        options={select.lang}
        onChange={callbacks.changeLng}
      />
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
    </div>
  );
}

export default React.memo(LayoutHeader);
