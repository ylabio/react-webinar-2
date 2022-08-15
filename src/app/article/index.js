import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import ArticleInfo from '../../components/article-info';
import LayoutLoader from '../../components/layout-loader';

function Article() {
  console.log('Article');

  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('article').load(id);
  }, [id]);

  const select = useSelector((state) => ({
    article: state.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <LayoutLoader>
        <ArticleInfo onAdd={callbacks.addToBasket} article={select.article} />
      </LayoutLoader>
    </Layout>
  );
}

export default React.memo(Article);
