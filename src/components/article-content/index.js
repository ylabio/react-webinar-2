import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";
import useTranslate from "../../utils/use-translate";

function ArticleContent({ onAdd, item, category, country }) {
  const cn = bem("article");
  const t = (phrase) => useTranslate(phrase);

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <span className={cn("description")}>{item.description}</span>
        <span className={cn("description")}>
          {t("article.madeIn")}{" "}
          <strong>
            {country.title} ({country.code})
          </strong>
        </span>
        <span className={cn("description")}>
          {t("article.category")} <strong>{category.title}</strong>
        </span>
        <span className={cn("description")}>
          {t("article.editionYear")} <strong>{item.edition}</strong>
        </span>
        <span className={cn("price")}>
          {t("article.price")} {numberFormat(item.price)} ₽
        </span>
      </div>
      <button className={cn("button")} onClick={callbacks.onAdd}>
        {t("main.add")}
      </button>
    </div>
  );
}

ArticleContent.propTypes = {
  onAdd: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
  category: propTypes.object.isRequired,
  country: propTypes.object.isRequired,
};

export default React.memo(ArticleContent);
