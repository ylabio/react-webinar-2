import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function ArticleContent({ translate, onAdd, item, category, country }) {
  const cn = bem("article");

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <span className={cn("description")}>{item.description}</span>
        <span className={cn("description")}>
          {translate.article.madeIn}{" "}
          <strong>
            {country.title} ({country.code})
          </strong>
        </span>
        <span className={cn("description")}>
          {translate.article.category} <strong>{category.title}</strong>
        </span>
        <span className={cn("description")}>
          {translate.article.editionYear} <strong>{item.edition}</strong>
        </span>
        <span className={cn("price")}>
          {translate.article.price} {numberFormat(item.price)} ₽
        </span>
      </div>
      <button className={cn("button")} onClick={callbacks.onAdd}>
        {translate.main.add}
      </button>
    </div>
  );
}

ArticleContent.propTypes = {
  translate: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
  category: propTypes.object.isRequired,
  country: propTypes.object.isRequired,
};

export default React.memo(ArticleContent);
