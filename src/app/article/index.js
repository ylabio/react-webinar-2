import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import ArticleInfo from '../../components/article-info';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Article() {

  const [item, setItem] = useState({})
  const params = useParams();
  const store = useStore();
  const madeIn = { ...item.maidIn };
  const category = { ...item.category };

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    getItemById(params.id);
    store.get('catalog').loadItemById(params.id)
  }, [params.id])

  async function getItemById(id) {
    const item = await store.get('catalog').getItemById(id);
    setItem(item.result);
  }

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  return (
    <Layout head={<h1>{item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ArticleInfo item={item} madeIn={madeIn} category={category}></ArticleInfo>
    </Layout>
  )
}

export default React.memo(Article)