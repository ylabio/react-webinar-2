import React, {useCallback, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom';
import useStore from "../../utils/use-store";
import useSelector from '../../utils/use-selector';
import Layout from '../../components/layout';
import ItemDetailed from '../../components/item-detailed';
import ProgressBar from '../../components/ui/progress-bar';
import Controls from '../../components/controls';

function Article() {

  console.log('Article');

  const store = useStore()
  const {_id} = useParams()
  const location = useLocation()

  const select = useSelector(state => ({
    article: state.catalog.currentItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    loading: state.catalog.loading,
    error: state.catalog.error
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление товара в корзину со страницы товара
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  useEffect(() => {
    store.get('catalog').loadArticle(_id)
  // пользователь может находиться на странице товара,
  // поэтому, чтобы перейти на новый товар из корзины, будем отслеживать текущий location
  }, [location.pathname])

  return (
    <Layout head={<h1>{!select.loading && select.article.title}</h1>}>
      <Controls onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.loading 
        ? <ProgressBar /> 
        : <ItemDetailed article={select.article} onAdd={callbacks.addToBasket} error={select.error}/>
      }
    </Layout>
  )
}

export default React.memo(Article)