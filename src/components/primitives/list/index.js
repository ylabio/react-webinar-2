import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function List({ items, children }) {
  const cn = bem("List");

  return <ul className={cn()}>{items.map(children)}</ul>;
}

List.propTypes = {
  children: propTypes.array.isRequired,
};

export default React.memo(List);
