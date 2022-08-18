import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import ArticleInfo from '../../components/article-info';
import LayoutLoader from '../../components/layout-loader';
import Header from '../../components/header';

function Article() {
  console.log('Article');

  const { id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    article: state.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language,
    loading: state.loading,
  }));

  useEffect(() => {
    store.get('article').load(id);
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    changeLanguage: useCallback((language) => store.changeLanguage(language), []),
  };

  return (
    <Layout
      head={<h1>{select.article.title}</h1>}
      changeLanguage={callbacks.changeLanguage}
      language={select.language}
    >
      <Header
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <LayoutLoader loading={select.loading}>
        <ArticleInfo
          onAdd={callbacks.addToBasket}
          article={select.article}
          language={select.language}
        />
      </LayoutLoader>
    </Layout>
  );
}

export default React.memo(Article);
