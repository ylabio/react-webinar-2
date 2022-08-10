import React from 'react'
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Button ({onClick, children}) {
  const cn = bem("Button");

  return (
    <button onClick={onClick} className={cn()} type='button'>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
}

Button.defaultProps = {
  onClick: () => {},
};


export default React.memo(Button);


