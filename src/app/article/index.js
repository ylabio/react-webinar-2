import React, {useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";

import Tools from "../../containers/tools";
import LocaleSelect from "../../containers/locale-select";
import LoginLogout from '../../containers/login-logout';

import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";

import isLocalStorageAvailable from '../../utils/test-localstorage';

function Article(){
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    items: state.basket.items,
    token: state.authorization.token
  }));
  
  const {t} = useTranslate();
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //выход пользовтаеля
  };

  useEffect(() => {
    //получаем данные из localStorage, если они есть  
    if ( isLocalStorageAvailable() && 
         localStorage.getItem("basket") && 
         select.items.length === 0)
      store.get('basket').setFromStorage(localStorage.getItem("basket"));
    //получаем информацию о пользователе
    if (select.token)
      store.get('userinfo').setUserInfo(select.token);  
  }, [])

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{select.article.title}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } loginlogout={<LoginLogout/>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} 
                     onAdd={callbacks.addToBasket}
                     priceText={t('article.price')}
                     countryText={t('article.country')}
                     categoryText={t('article.category')}
                     yearText={t('article.year')}
                     addText={t('article.add')}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
