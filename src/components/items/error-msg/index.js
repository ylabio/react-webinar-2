import React from "react";
import propTypes from "prop-types";
import './style.css';

const ErrorMsg = ({children}) => {
    return (
    <div className={"ErrorMsg"}>
      {children}
    </div>
    );
};

ErrorMsg.propTypes = {
  children: propTypes.node.isRequired,
}

export default ErrorMsg;
