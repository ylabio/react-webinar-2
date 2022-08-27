import React, { useCallback } from "react";
import "./style.css";
import propTypes from "prop-types";

const A = ({ children, onClick, href }) => {
  const cb = {
    onClick: useCallback(
      (e) => {
        e.preventDefault();
        onClick();
      },
      [onClick]
    ),
  };

  return (
    <a href={href} className={"A"} onClick={cb.onClick}>
      {children}
    </a>
  );
};

A.propTypes = {
  children: propTypes.node,
  onClick: propTypes.func,
  href: propTypes.string,
};

A.defaultProps = {
  onClick: () => {},
};

export default React.memo(A);
