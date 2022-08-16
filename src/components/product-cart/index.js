import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProductCart({ product, addToBasket, id }) {
  const cn = bem("ProductCart");

  if (product) {
    return (
      <div className={cn()}>
        <p>{product.description}</p>
        <p>
          Страна производитель:{" "}
          <span className={cn("text")}>
            {`${product.country} (${product.countryCode})`}
          </span>
        </p>
        <p>
          Категория: <span className={cn("text")}>{product.category}</span>
        </p>
        <p>
          Год выпуска: <span className={cn("text")}>{product.edition}</span>
        </p>
        <h2 className={cn("price")}>
          {`Цена: ${product.price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}`}
        </h2>
        <button onClick={() => addToBasket(id)}>Добавить</button>
      </div>
    );
  }
}

export default React.memo(ProductCart);