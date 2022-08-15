import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemDescription from "../../components/item-description";
import ErrorMessage from "../../components/error-message";
import localization from "./localization";

function ItemPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  const store = useStore();  
  
  const select = useSelector(state => ({
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang
  }));

  useEffect(() => {
    setLoading(true);
    setError(false);
    store.get('catalog').loadItem(params.id)
         .then(
           () => setLoading(false),
           () => setError(true)
         );
  }, [params.id])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };
  
  return (
    <Layout head={<h1>{error ? localization[select.lang].headError : 
                       loading ? localization[select.lang].headLoad : 
                       select.item.title}
                  </h1>}
    >
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/> 
      {
        error ? <ErrorMessage message={"Не удалось загрузить данные о товаре"}/> : 
        loading ? <></> : 
        <ItemDescription item={select.item} onAdd={callbacks.addToBasket}/>
      }
    </Layout>
  );
}

export default React.memo(ItemPage);