import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useContext, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Loader from "../../components/loader";
import {useNavigate, useParams} from "react-router-dom";
import ArticleDetails from "../../components/article-details";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";
import Navigation from "../../components/navigation";

function Article(){

  console.log('Article');

  const store = useStore();
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item,
    current: state.pagination.current,
  }));

  const {id} = useParams();

  useEffect(() => {
    store.get('modals').close();
    store.get('article').load(id);
    return () => store.get('article').clearData();
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
    onHomeClick:  useCallback(evt => {
      evt.preventDefault();
      navigate(`/catalog/${select.current}`, { replace: true });
    }, []),
  };

  return (
    <Layout head={<h1>{select.item.title ? select.item.title : Translation[language].loading}</h1>}>
      <Navigation onClick={callbacks.onHomeClick}/>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}/>
      {select.item.id ?
        <ArticleDetails item={select.item} onAdd={callbacks.addToBasket}/> :
        <Loader />}
    </Layout>
  )
}

export default React.memo(Article);
