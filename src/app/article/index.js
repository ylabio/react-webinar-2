import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleContent from "../../components/article-content";
import Translate from "../../components/translate";
import NavBar from "../../components/nav-bar";

function Article(){

  console.log('Article');

  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.get('article').load(params.id);
  }, [params.id])

  const select = useSelector(state => ({
    item: state.article.item,
    content: {
      country: state.article.country,
      code: state.article.code,
      category: state.article.category,
    },
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.languages,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('article').addToBasket(id), []),
    // Перевод
    translate: useCallback((language) => store.get('languages').translate(language), []),
  };

  const renders = {
    article: useCallback(() =>
      <ArticleContent lang={select.lang}
                      item={select.item}
                      content={select.content}
                      onAdd={callbacks.addToBasket}/>,
      [select.lang, select.item]),
  }

  return (
    <Layout head={
      <>
        <h1>{select.item.title}</h1>
        <Translate translate={callbacks.translate}
                   lang={select.lang}
        />
      </>
    }>
      <NavBar links={{"/": select.lang.main,}}/>
      <BasketSimple lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {renders.article()}
    </Layout>
  )
}

export default React.memo(Article);
