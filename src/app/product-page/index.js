import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ProductInfo from "../../components/product-info";
import { useParams } from "react-router-dom";

function ProductPage() {
  console.log("ProductPage");

  const store = useStore();

  const select = useSelector((state) => ({
    productInfo: state.productPage.productInfo,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Закрытие корзины
    closeModalBasket: useCallback(() => store.get("modals").close(), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  const { id } = useParams();

  useEffect(() => {
    store.get("productPage").load(id);
  }, [id]);
  return (
    <Layout head={<h1>{select.productInfo.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ProductInfo
        {...select.productInfo}
        addToBasket={callbacks.addToBasket}
      />
    </Layout>
  );
}

export default React.memo(ProductPage);
