import React from "react";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import "./style.css";

function ArticleProfile({ profile, onAddToBasket }) {
  const cn = bem("ArticleProfile");
  return (
    <div className={cn()}>
      <p className={cn("description")}>{profile.description}</p>
      <span className={cn("country")}>
        Страна производитель: <b>{profile.country}</b>
      </span>
      <span className={cn("category")}>
        Категория: <b>{profile.category}</b>
      </span>
      <span className={cn("edition")}>
        Год выпуска: <b>{profile.edition}</b>
      </span>
      <span className={cn("price")}>Цена: {numberFormat(profile.price)} ₽</span>
      <button onClick={onAddToBasket}>Добавить</button>
    </div>
  );
}

export default ArticleProfile;
