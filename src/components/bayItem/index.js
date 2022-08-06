import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function BuyItem({ item, setBuyState }) {
  return 11;
}

Item.propTypes = {
  item: propTypes.object,
  setBuyState: propTypes.func,
};

Item.defaultProps = {
  setBuyState: () => {},
  item: {},
};

export default React.memo(BuyItem);
