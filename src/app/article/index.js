import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import {useLocation, useParams, useNavigate} from 'react-router-dom'
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemArticle from "../../components/item-article";
import Spinner from "../../components/spinner";
import { translate } from "../../utils/translate";

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
    language: state.language.language,
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
    // Смена языка
    selectLanguage: useCallback(language => store.get('language').selectLanguage(language), [])
  };

  return (
    <Layout head={select.loading ? <h1>{translate(select.language, 'Loading')}</h1> : <h1>{select.item && select.item.title}</h1>} language={select.language} selectLanguage={callbacks.selectLanguage}>
      <BasketSimple language={select.language} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.loading ? 
        <Spinner /> :
        <ItemArticle language={select.language} item={select.item} onAdd={callbacks.addToBasket} />}
    </Layout>
  )
}

export default React.memo(Article);
