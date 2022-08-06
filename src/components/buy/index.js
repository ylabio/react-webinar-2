import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { allBuy } from "../../utils";
import "./style.css";

function Buy({ buyState, setModal }) {
  const cn = bem("Buy");

  return (
    <div className={cn()}>
      <span>
        В корзине:{" "}
        <b>
          {buyState.length
            ? `${buyState.reduce(
                (acc, curr) => acc + curr.total,
                0
              )} товара / ${allBuy(buyState)} ₽`
            : "пусто"}
        </b>
      </span>
      <button onClick={() => setModal(true)}>Перейти</button>
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
