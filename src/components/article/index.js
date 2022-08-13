import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import numberFormat from "../../utils/number-format";

function Article(props) {
  const cn = bem("Article");
  const { article, onAdd } = props;

  return (
    <div className={cn()}>
      <div className={cn("description")}>{article.description}</div>
      <div className={cn("info")}>
        <div className={cn("title")}>Страна производитель:</div>
        <div className={cn("value")}>
          {article.maidIn?.title} ({article.maidIn?.code})
        </div>
      </div>
      <div className={cn("info")}>
        <div className={cn("title")}>Категория:</div>
        <div className={cn("value")}>{article.category?.title}</div>
      </div>
      <div className={cn("info")}>
        <div className={cn("title")}>Год выпуска:</div>
        <div className={cn("value")}>{article.edition}</div>
      </div>
      <div className={cn("info")}>
        <div className={cn("title")}>Цена:</div>
        <div className={cn("value")}>{numberFormat(article.price)} ₽</div>
      </div>
      <button onClick={() => onAdd(article._id)}>Добавить</button>
    </div>
  );
}

Article.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

Article.defaultProps = {
  article: {},
  onAdd: () => {},
};

export default React.memo(Article);
