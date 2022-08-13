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
import getTranslation from "../../utils/getTranslation";
import translations from "../../shared/data/translations";

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
        <MainRoute 
          to={config.routes.home_page}
          translationData={{
            name: getTranslation(
              select.language,
              translations.components.MainRoute.main
            )
          }} 
        />
      }
      basket={
        <BasketSimple
          amount={select.amount}
          sum={select.sum}
          onOpen={callbacks.openModalBasket}
          lang={select.language}
          traslationData={{
            inCart: getTranslation(
              select.language,
              translations.components.BasketSimple.in_cart
            ),
            empty: getTranslation(
              select.language,
              translations.components.BasketSimple.empty
            ),
            go_to: getTranslation(
              select.language,
              translations.html_elements.button.go_to
            ),
          }}
        />
      } 
    >
      <CardContent 
        item={select.item}
        language={select.language}
        onAdd={callbacks.onAdd}
        isFetching={select.isFetching}
        translationData={{
          country: getTranslation(
            select.language,
            translations.components.CardContent.country
          ),
          category: getTranslation(
            select.language,
            translations.components.CardContent.country
          ),
          year: getTranslation(
            select.language,
            translations.components.CardContent.year
          ),
          price: getTranslation(
            select.language,
            translations.components.CardContent.price
          ),
          add: getTranslation(
            select.language,
            translations.html_elements.button.add
          ),
        }}
      />
    </Layout>
  )
}

export default React.memo(Card);
