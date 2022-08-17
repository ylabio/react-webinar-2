import React from "react";
import { dots } from "../../../utils/use-pagination";
import {cn as bem} from "@bem-react/classname";

function Dots() {
  const cn = bem('Pagination');

  return (
    <li className={`${cn('item')} ${cn('dots')}`}>{dots}</li>
  )
}

export default React.memo(Dots);