import React  from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import plural from "plural-ru";
import { formatToRUB } from "../../utils";

function Total({ object, isShowAmount }) {
  const cn = bem("Total");
  return (
    <div className={cn()}>
      {object?.total.price || object?.total.amount ? (
        <>
          <div className={cn("amount")}>
            {isShowAmount
              ? `${object.total.amount} ${plural(
                    object.total.amount,
                  "товар",
                  "товара",
                  "товаров"
                )} / `
              : "Итого"}
            {}
          </div>
          <div className={cn("price")}>{formatToRUB(object.total.price)}</div>
        </>
      ) : (
        "пусто"
      )}
    </div>
  );
}

Total.propTypes = {
  list: propTypes.object.isRequired,
  isShowAmount: propTypes.bool,
};

Total.defaultProps = {
  list: {},
  isShowAmount: false,
};

export default React.memo(Total);
