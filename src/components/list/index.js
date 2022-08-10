import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

// Переиспользуемый List

function List({ items, component }) {
  const cn = bem("List");
  return <div className={cn()}>{items.map(component)}</div>;
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  component: propTypes.elementType.isRequired,
};

export default React.memo(List);
