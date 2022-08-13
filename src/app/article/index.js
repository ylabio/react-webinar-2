import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import GoodsInfo from "../../components/goods-info";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Article(){

  console.log('Article');

  const store = useStore();

  const select = useSelector(state => ({
    info: state.article.goods,
    country: state.article.country,
    category: state.article.category,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  useEffect(() => {
    store.get('article').load();
  }, [])

  return (
    <Layout head={<h1>{select.info.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <GoodsInfo info={select.info}  country={select.country} category={select.category}  onAdd={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(Article);
