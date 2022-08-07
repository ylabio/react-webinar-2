import { cn as bem } from "@bem-react/classname";
import React from "react";
import propTypes from 'prop-types';
import './style.css';

function Button(props) {
  const cn = bem('Button');
  return (
    <button type="button" className={cn()} onClick={props.callBack}>
      {props.title}
    </button>
  )
}

Button.propTypes = {
  title: propTypes.node.isRequired,
  callBack: propTypes.func.isRequired,
}

Button.defaultProps = {
  callBack: () => { },
}

export default React.memo(Button);