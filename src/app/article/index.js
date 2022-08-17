import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleContent from "../../components/article-content";
import Translate from "../../components/translate";
import NavBar from "../../components/nav-bar";
import Loader from "../../components/loader";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Controls from "../../components/controls";

function Article(){

  console.log('Article');

  const store = useStore();
  const params = useParams();

  const select = useSelector(state => ({
    item: state.article.item,
    content: {
      country: state.article.country,
      code: state.article.code,
      category: state.article.category,
    },
    loading: state.article.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.languages,
  }));

  useEffect(() => {
    store.get('article').isLoading();
    store.get('article').load(params.id);
  }, [params.id])

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
        <h1>
          {
            !select.loading && select.item.title
          }
        </h1>
        <Translate translate={callbacks.translate}
                   lang={select.lang}
        />
      </>
    }>
      <Controls>
        <NavBar links={{"/": select.lang.main,}}/>
        <BasketSimple lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Controls>
      {
        select.loading
          ? <Loader />
          : renders.article()
      }
    </Layout>
  )
}

export default React.memo(Article);
