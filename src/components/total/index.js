import React, { useMemo } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import plural from "plural-ru";
import { formatToRUB } from "../../utils";

function Total({ list, isShowAmount }) {
  const cn = bem("Total");
  const totalPrice = useMemo(() => {
    return list
      .map((item) => (item.price && item.amount ? item.price * item.amount : 0))
      .reduce((prev, value) => prev + value, 0);
  }, [list]);

  const totalAmount = useMemo(() => {
    return list.length;
  }, [list.length]);
  return (
    <div className={cn()}>
      {totalPrice || totalAmount ? (
        <>
          <div className={cn("amount")}>
            {isShowAmount
              ? `${totalAmount} ${plural(
                  totalAmount,
                  "товар",
                  "товара",
                  "товаров"
                )} / `
              : "Итого"}
            {}
          </div>
          <div className={cn("price")}>{formatToRUB(totalPrice)}</div>
        </>
      ) : (
        "пусто"
      )}
    </div>
  );
}

Total.propTypes = {
  list: propTypes.array.isRequired,
  isShowAmount: propTypes.bool,
};

Total.defaultProps = {
  list: [],
  isShowAmount: false,
};

export default React.memo(Total);
