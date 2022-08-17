import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from 'react-router-dom';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ArticleDescription from "../../components/article-description";
import Menu from "../../components/menu";


function Article(){

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.get('article').loadById(id);
  }, [id])

  const select = useSelector(state => ({
    item: state.article.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <Menu link='/' title='Главная'/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ArticleDescription item={select.item} onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(Article);