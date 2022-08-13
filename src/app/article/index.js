import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleContent from "../../components/article-content";
import Translate from "../../components/translate";

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
    // Переводы
    translateRu: useCallback(() => store.get('languages').translateRu(), []),
    translateEn: useCallback(() => store.get('languages').translateEn(), []),
  };

  const renders = {
    article: useCallback((id, lang, item, content, onAdd) =>
      <ArticleContent id={id}
                      lang={lang}
                      item={item}
                      content={content}
                      onAdd={onAdd}/>,
      [select.lang]),
  }

  return (
    <Layout head={
      <>
        <h1>{select.item.title}</h1>
        <Translate translateRu={callbacks.translateRu}
                   translateEn={callbacks.translateEn}
                   lang={select.lang}
        />
      </>
    }>
      <BasketSimple lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {renders.article(params.id, select.lang, select.item, select.content, callbacks.addToBasket)}
    </Layout>
  )
}

export default React.memo(Article);
