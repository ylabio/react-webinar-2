import React, { useCallback, useEffect } from 'react';
import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import ArticleInfo from '../../components/article-info';
import { useParams } from 'react-router-dom';
import Preloader from '../../components/preloader';
import Wrapper from '../../components/wrapper';
import Menu from '../../components/menu';

function ArticlePage() {
  const store = useStore();

  const { id } = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item,
  }));

  console.log('ArticlePage');

  useEffect(() => {
    store.get('article').load(id);

    return () => {
      store.get('article').clearState();
    };
  }, [id]);

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <Wrapper>
        <Menu />
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Wrapper>

      {select.item._id ? (
        <ArticleInfo data={select.item} onAdd={callbacks.addToBasket} />
      ) : (
        <Preloader />
      )}
    </Layout>
  );
}

export default React.memo(ArticlePage);
