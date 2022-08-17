import BasketSimple from "../basket-simple";
import React, {useCallback, useEffect} from "react";
import Menu from "../menu";
import {cn as bem} from "@bem-react/classname";

import './styles.css';





function Sidebar(props){

  const cn = bem('Sidebar');

  return (
    <div className={cn()}>
      <div className={cn('menu')}>
        <Menu />
      </div>
      <div className={cn('basket')}>
        <BasketSimple onOpen={props.onOpen} amount={props.amount} sum={props.sum}/>
      </div>
    </div>
  )
}

export default React.memo(Sidebar);
