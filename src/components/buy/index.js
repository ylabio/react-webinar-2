import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Buy(props) {
  const cn = bem("Buy");

  return (
    <div className={cn()}>
      <span>
        В корзине:{" "}
        <b>
          {props.buyState.length
            ? props.buyState.reduce((acc, curr) => acc + curr.price, 0)
            : "пусто"}
        </b>
      </span>
      <button onClick={() => props.setModal(true)}>Перейти</button>
    </div>
  );
}

Buy.propTypes = {
  buyState: propTypes.array,
  setModal: propTypes.func,
};

Buy.defaultProps = {
  buyState: [],
  setModal: () => {},
};

export default React.memo(Buy);
