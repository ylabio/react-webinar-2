import React, { memo, useCallback } from "react";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import { Link } from "react-router-dom";
import BasketSimple from "../../components/basket-simple";
import "./style.css";
import useLanguage from "../../utils/use-language";
import useLoadProduct from "../../utils/use-loadProduct";
import ProductInfo from "../../components/product-info";

function Product() {
  const store = useStore();
  const langPackage = useLanguage();
  const [id] = useLoadProduct(store);

  const select = useSelector((state) => state.catalog.currentProduct);
  const basket = useSelector((state) => state.basket);

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    addToBasket: useCallback((e) => store.get("basket").addToBasket(id), []),
  };

  return (
    select && (
      <Layout head={<h1>{select.title}</h1>}>
        <div className="Product__container">
          <BasketSimple
            amount={basket.amount}
            sum={basket.sum}
            onOpen={callbacks.openModalBasket}
            lang={langPackage.basketSimple}
          >
            <Link to="/" className="Product__main-link">
              {langPackage.product.main}
            </Link>
          </BasketSimple>

          <ProductInfo data={select} lang={langPackage} />
          <button onClick={callbacks.addToBasket}>
            {langPackage.buttons.add}
          </button>
        </div>
      </Layout>
    )
  );
}

export default memo(Product);
