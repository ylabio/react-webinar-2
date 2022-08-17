import React, { memo, useCallback } from "react";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import BasketSimple from "../../components/basket-simple";
import useLanguage from "../../utils/use-language";
import useLoadProduct from "../../utils/use-loadProduct";
import ProductInfo from "../../components/product-info";
import MenuNavigate from "../../components/menu-navigate";
import LanguageSelect from "../../components/language-select";

function Product() {
  const store = useStore();
  const langPackage = useLanguage();
  const [id] = useLoadProduct(store);

  const select = useSelector((state) => ({
    currentProduct: state.catalog.currentProduct,
    basket: state.basket,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    addToBasket: useCallback((e) => store.get("basket").addToBasket(id), []),
  };

  const languageModule = store.get("language");

  return select.currentProduct ? (
    <Layout
      head={
        <>
          <h1>{langPackage.title}</h1>
          <LanguageSelect
            langState={languageModule.getState.bind(languageModule)}
            setLanguage={languageModule.setLanguage.bind(languageModule)}
          />
        </>
      }
    >
      <BasketSimple
        amount={select.basket.amount}
        sum={select.basket.sum}
        onOpen={callbacks.openModalBasket}
        lang={langPackage.basketSimple}
      >
        <MenuNavigate lang={langPackage.product} />
      </BasketSimple>

      <ProductInfo data={select.currentProduct} lang={langPackage}>
        <button onClick={callbacks.addToBasket}>
          {langPackage.buttons.add}
        </button>
      </ProductInfo>
    </Layout>
  ) : (
    <div>Загрузка...</div>
  );
}

export default memo(Product);
