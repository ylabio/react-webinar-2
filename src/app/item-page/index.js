import BasketSimple from "../../components/basket-simple";
import Controls from "../../components/controls";
import Layout from "../../components/layout";
import React, {useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
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
    item: state.item.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang
  }));

  useEffect(() => {
    setLoading(true);
    setError(false);
    store.get('item').loadItem(params.id)
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
    //Изменение языка
    setLang: useCallback(() => store.get('localization').setLang(), []),
  };

  const renders = {
    link: useCallback((text) => <Link to="/">{text}</Link>, [])
  };
  
  return (
    <Layout head={<h1>{error ? localization[select.lang].headError : 
                       loading ? localization[select.lang].headLoad : 
                       select.item.title}
                  </h1>}
            setLang={callbacks.setLang}
            lang={select.lang}
    >
      <Controls lang={select.lang} linkRender={renders.link}>
        <BasketSimple onOpen={callbacks.openModalBasket} 
                      amount={select.amount} 
                      sum={select.sum}
                      lang={select.lang}
        />
      </Controls> 
      {
        error ? <ErrorMessage message={localization[select.lang].errorMessage}/> : 
        loading ? <></> : 
        <ItemDescription item={select.item} onAdd={callbacks.addToBasket} lang={select.lang}/>
      }
    </Layout>
  );
}

export default React.memo(ItemPage);