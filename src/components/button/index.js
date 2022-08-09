import { cn as bem } from "@bem-react/classname";
import React from "react";
import propTypes from 'prop-types';
import './style.css';

function Button({ title, callBack }) {
  const cn = bem('Button');
  return (
    <button type="button" className={cn()} onClick={callBack}>
      {title}
    </button>
  )
}

Button.propTypes = {
  title: propTypes.string.isRequired,
  callBack: propTypes.func.isRequired,
}



export default React.memo(Button);