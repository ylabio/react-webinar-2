import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import { useParams } from 'react-router-dom';
import ArticleSimple from '../../components/article-simple';
import Menu from '../../components/menu';

function Article() {
  let { id } = useParams();
  console.log('Article');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').loadItem(id);
  }, [id]);

  const select = useSelector((state) => ({
    selectItem: state.catalog.selectItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    country: state.catalog.country,
    category: state.catalog.category,
  }));
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.selectItem ? select.selectItem.title : ''}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}>
        <Menu />
      </BasketSimple>
      <ArticleSimple
        id={id}
        description={select.selectItem && select.selectItem.description}
        price={select.selectItem && select.selectItem.price}
        edition={select.selectItem && select.selectItem.edition}
        onAdd={callbacks.addToBasket}
        category={select.category && select.category.title}
        country={select.country && select.country.title}
      />
    </Layout>
  );
}

export default React.memo(Article);
