import React, { useCallback } from "react";
import propTypes from "prop-types";
import "./style.css";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import { countingTotalPriceAllItems } from "../../utils";

function Controls({ setIsOpenedModal, isMainContent, consolidationItems }) {
  const cn = bem("Controls");
  const amountOfItems = consolidationItems.length;
  const totalPriceAllItems = countingTotalPriceAllItems(consolidationItems);
  const callbacks = {
    onClick: useCallback(() => {
      setIsOpenedModal(true);
    }, [setIsOpenedModal]),
    onClose: useCallback(() => {
      setIsOpenedModal(false);
    }, [setIsOpenedModal]),
  };
  return (
    <div className={isMainContent ? cn() : cn("background")}>
      {isMainContent ? null : <h1>Корзина</h1>}
      {isMainContent ? (
        <div>
          В корзине:{" "}
          <span className={cn("totalPrice")}>
            {amountOfItems
              ? `${amountOfItems} ${plural(
                  amountOfItems,
                  "товар",
                  "товара",
                  "товаров"
                )} / ${totalPriceAllItems} \u20BD`
              : "пусто"}
          </span>
        </div>
      ) : null}
      {isMainContent ? (
        <button className={cn("buttonMain")} onClick={callbacks.onClick}>
          Перейти
        </button>
      ) : (
        <button className={cn("button")} onClick={callbacks.onClose}>
          Закрыть
        </button>
      )}
    </div>
  );
}

Controls.propTypes = {
  consolidationItems: propTypes.arrayOf(propTypes.object).isRequired,
  isMainContent: propTypes.any,
  setIsOpenedModal: propTypes.func.isRequired,
};

Controls.defaultProps = {
  consolidationItems: [],
  setIsOpenedModal: () => {},
};

export default React.memo(Controls);
