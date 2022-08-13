import React from "react"
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Wrapper(props) {
  const cn = bem('Wrapper')

  return (
    <div className={cn()}>
      {props.children}
    </div>
  )
}

export default React.memo(Wrapper)