import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleCard from "../../components/article-card"

function Article() {

  console.log('Article');

  const store = useStore();

  const params = useParams();

  useEffect(() => {
    store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };
  //Пора декомпозировать)
  const options = {
    menuItems: [
      {key: 1, title: 'Главная', link: '/'},
    ]
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
                    options={options.menuItems}/>
      <ArticleCard article={select.article} onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(Article);