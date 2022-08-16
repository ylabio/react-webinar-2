import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import ArticleInfo from '../../components/article-info';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import MenuBasket from '../../components/menu-basket';

function Article() {

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article
  }));

  const params = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('catalog').loadItemById(params.id);
    store.get('article').load(params.id)
    return function cleanArticle() {
      store.get('article').clean();
    }
  }, [params.id])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <MenuBasket openModal={callbacks.openModalBasket} items={select} />
      <ArticleInfo article={select.article} addToBasket={callbacks.addToBasket}></ArticleInfo>
    </Layout>
  )
}

export default React.memo(Article)