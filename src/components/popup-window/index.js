import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function PopupWindow({children, show}){
  const cn = bem('PopupWindow');

  return (
    <div className={cn()}>
        {children}
    </div>
  )
}

PopupWindow.propTypes = {
  children: propTypes.node,
}

PopupWindow.defaultProps = {
    children: <></>,
}

export default React.memo(PopupWindow);
