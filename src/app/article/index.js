import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Loader from "../../components/loader";
import {useNavigate, useParams} from "react-router-dom";
import ArticleDetails from "../../components/article-details";
import getTranslation from "../../services/locale";
import Navigation from "../../components/navigation";

function Article(){

  console.log('Article');

  const store = useStore();
  const navigate = useNavigate();
  const {id} = useParams();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.article.item,
    current: state.catalog.current,
    language: state.language.value,
  }));

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
    getTranslation: useCallback(code => {
      return getTranslation(select.language, code);
    }, [select.language]),
    changeLanguage: useCallback(value => {
      console.log('CALLBACK');
      store.get('language').changeLanguage(value);
    }, [select.language]),
  };

  return (
    <Layout head={<h1>{select.item.title ? select.item.title : (callbacks.getTranslation('loading') || 'Данные загружаются...')}</h1>}
            onLanguageChange={callbacks.changeLanguage}
            currentLanguage={select.language}>
      <Navigation onClick={callbacks.onHomeClick}
                  getTranslation={callbacks.getTranslation}/>
      <BasketSimple onOpen={callbacks.openModalBasket}
                    amount={select.amount}
                    sum={select.sum}
                    getTranslation={callbacks.getTranslation}/>
      {select.item.id ?
        <ArticleDetails item={select.item}
                        onAdd={callbacks.addToBasket}
                        getTranslation={callbacks.getTranslation}/> :
        <Loader />}
    </Layout>
  )
}

export default React.memo(Article);
