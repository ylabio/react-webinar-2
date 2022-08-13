import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import {useParams} from 'react-router-dom';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Header from "../../components/header";
import CardContent from "../../components/card-content/card-content";
import BasketSimple from "../../components/basket-simple";
import { config } from "../../config";
import MainRoute from "../../components/main-route";

function Card() {
  const params = useParams();
  const store = useStore();
  const select = useSelector(state => ({
    item: state.card.item,
    isFetching: state.card.isFetching,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language,
  }));

  useEffect(() => {
    store.get('card').getGoodById(params.id);
  } , [params.id, select.language])

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    onAdd: useCallback((id) => store.get('basket').addToBasket(id), []),
    changeLanguage: useCallback(lang => store.get('language').changeLanguage(lang), []),
  };

  return (
    <Layout 
      head={
        <Header 
          title={select.item?.title}
          changeLanguage={callbacks.changeLanguage}
          lang={select.language}
          flag={true}
        />
      }
      nav={
        <MainRoute to={config.routes.home_page} />
      }
      basket={
        <BasketSimple
          amount={select.amount}
          sum={select.sum}
          onOpen={callbacks.openModalBasket}
          lang={select.language}
        />
      } 
    >
      <CardContent 
        item={select.item}
        language={select.language}
        onAdd={callbacks.onAdd}
        isFetching={select.isFetching}
      />
    </Layout>
  )
}

export default React.memo(Card);
