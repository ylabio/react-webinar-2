import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {useLocation, useParams, useNavigate} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemArticle from "../../components/item-article";
import Spinner from "../../components/spinner";

function Article(){

  console.log('Article');
  const navigate = useNavigate();
  const location = useLocation();
  const {_id} = useParams()

  useEffect(() => {    
    store.get('article').load(_id);
    return () => {
			store.get('article').reset()
		};
  }, [_id])

  const store = useStore();

  const select = useSelector(state => ({
    loading: state.article.loading,
    item: state.article.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => navigate("/basket", { state: { modal: location } }), [location]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={select.loading ? <h1>Загрузка...</h1> : <h1>{select.item && select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.loading ? 
        <Spinner /> :
        <ItemArticle item={select.item} onAdd={callbacks.addToBasket} />}
    </Layout>
  )
}

export default React.memo(Article);
