import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import useTranslate from "../../utils/use-translate";

function BasketSimple({ sum, amount, onOpen }) {
  const cn = bem("BasketSimple");
  const t = (phrase) => useTranslate(phrase);
  let pluralPhrase = [
    useTranslate("main.product1"),
    useTranslate("main.product2"),
    useTranslate("main.product3"),
  ];
  let empty = useTranslate("main.empty");

  return (
    <div className={cn()}>
      <span className={cn("label")}>{t("main.inBasket")}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, ...pluralPhrase)} / ${numberFormat(
              sum
            )} ₽`
          : `${empty}`}
      </span>
      <button className={cn("button")} onClick={onOpen}>
        {t("basket.openModal")}
      </button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

BasketSimple.defaultProps = {
  sum: 0,
  amount: 0,
};

export default React.memo(BasketSimple);
