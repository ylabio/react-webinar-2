import React from "react";
import { DOTS } from "../../../utils/use-pagination";
import {cn as bem} from "@bem-react/classname";

function Dots() {
  const cn = bem('Pagination');

  return (
    <li className={`${cn('item')} ${cn('dots')}`}>{DOTS}</li>
  )
}

export default React.memo(Dots);
