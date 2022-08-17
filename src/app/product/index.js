import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useContext, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import {ProductCard} from "components/product-card";
import {LocalisationContext} from "l10n";
import Navigation from "components/navigation";
import Controls from "components/controls";
import {translation} from "l10n/strings/translation";
import {routes} from "utils/constants/routes";
import {navigation} from "utils/constants/navigation";

function Product() {
  console.log('Product');

  const store = useStore();

  const {id} = useParams();
  const {lang} = useContext(LocalisationContext);
  const navigationList = navigation[lang];
  const cartStrings = translation[lang].cart;
  const productCardStrings = translation[lang].product.card;


  useEffect(() => {
    store.get('catalog').loadProduct(id, lang);
  }, [id, lang]);

  const select = useSelector(state => ({
    items: state.catalog.items,
    product: state.catalog.product,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };


  return (
    <Layout head={<h1>{select.product?.title}</h1>}>
      <Controls>
        <Navigation items={navigationList}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} strings={cartStrings}/>
      </Controls>
      <ProductCard item={select.product} onAdd={callbacks.addToBasket} strings={productCardStrings}/>
    </Layout>
  );
}

export default React.memo(Product);
