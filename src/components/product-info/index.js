import { memo } from "react";
import React from "react";
import numberFormat from "../../utils/numberFormat";
import "./style.css";
import propTypes from "prop-types";

function ProductInfo({ data, lang, children }) {
  return !data?.title ? (
    <div>Загрузка...</div>
  ) : (
    <div className="ProductInfo">
      <div className="ProductInfo__description">{data?.description}</div>
      <div className="ProductInfo__maid-in">
        {lang.product.mainID}
        <strong>{`${data?.maidIn?.title} (${data?.maidIn?.code})`}</strong>
      </div>
      <div className="ProductInfo__category">
        {lang.product.category}
        <strong>{data?.category?.title}</strong>
      </div>
      <div className="ProductInfo__edition">
        {lang.product.edition}
        <strong>{data?.edition}</strong>
      </div>
      <div className="ProductInfo__price">
        {lang.product.price}
        {numberFormat(data?.price)} ₽
      </div>
      {children}
    </div>
  );
}

ProductInfo.propTypes = {
  data: propTypes.object.isRequired,
  lang: propTypes.object.isRequired,
  children: propTypes.node,
};

ProductInfo.defaultProp = {};

export default memo(ProductInfo);
