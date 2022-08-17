import React, { useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import BasketSimple from "../../components/basket-simple";
import Menu from "../../components/menu";
import "./style.css";
import Select from "../select";

function LayoutHeader(props) {
  const cn = bem("LayoutHeader");

  return (
    <div className={cn()}>
      <Menu lng={props.current} />
      <Select
        value={props.current}
        options={props.lang}
        onChange={props.onChange}
      />
      <BasketSimple
        onOpen={props.onOpen}
        amount={props.amount}
        sum={props.sum}
        lng={props.current}
      />
    </div>
  );
}

export default React.memo(LayoutHeader);
