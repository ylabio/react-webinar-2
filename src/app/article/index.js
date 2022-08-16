import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useMemo} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleCard from "../../components/article-card";
import Menu from "../../components/menu";
import LayoutFlex from "../../components/layout-flex";
import Spinner from "../../components/spinner";

function Article(){

  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useEffect(() => {
    store.get('article').load(params.id);
  }, [params.id])

  const select = useSelector(state => ({
    article: state.article.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
    waiting: state.article.waiting
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/'},
    ]), [])
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <LayoutFlex flex="between">
        <Menu items={options.menu}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </LayoutFlex>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
