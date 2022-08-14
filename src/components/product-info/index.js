import { memo } from "react";
import React from "react";
import numberFormat from "../../utils/numberFormat";
import "./style.css";

function ProductInfo({ data, lang }) {
  return (
    <div className="ProductInfo">
      <div className="ProductInfo__description">{data.description}</div>
      <div className="ProductInfo__maid-in">
        {lang.product.mainID}
        <strong>{`${data.maidIn.title} (${data.maidIn.code})`}</strong>
      </div>
      <div className="ProductInfo__category">
        {lang.product.category}
        <strong>{data.category.title}</strong>
      </div>
      <div className="ProductInfo__edition">
        {lang.product.edition}
        <strong>{data.edition}</strong>
      </div>
      <div className="ProductInfo__price">
        {lang.product.price}
        {numberFormat(data.price)} ₽
      </div>
    </div>
  );
}

export default memo(ProductInfo);
