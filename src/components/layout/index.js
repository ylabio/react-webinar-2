import React, { memo } from "react";
import "./style.css";
import propTypes from "prop-types";

function Layout(props) {
  const { head, children, maxWidth, minHeight, width, height } = props;

  return (
    <div
      className="Layout"
      style={{
        maxWidth: maxWidth,
        minHeight: minHeight,
        width: width,
        height: height,
      }}
    >
      <div className="Layout__head">{head}</div>
      <div className="Layout__content">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  maxWidth: propTypes.string,
  minHeight: propTypes.string,
  width: propTypes.string,
  height: propTypes.string,
};

Layout.defaultProps = {
  maxWidth: "",
  minHeight: "",
  width: "",
  height: "",
};

export default memo(Layout);
