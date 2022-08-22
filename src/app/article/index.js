import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import LocaleSelect from "../../containers/locale-select";
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
    dataUser: state.authorization.dataUser
  }));
  
  const {t} = useTranslate();

 //управление отображением в Authorization
  let user = '';
  if (select.dataUser?.profile?.name)
   user = select.dataUser.profile.name;

  //проверка авторизации
  let tokenCookie = '';
  if (navigator.cookieEnabled)
   tokenCookie = document.cookie.match(/token=(.+?)(;|$)/);
  if(!user && tokenCookie)
    store.get('authorization').reLogin(tokenCookie[1]);
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //выход пользовтаеля
  };

  //получаем данные из localStorage, если они есть  
  useEffect(() => {
    if ( isLocalStorageAvailable() && localStorage.getItem("basket"))
      store.get('basket').setFromStorage(localStorage.getItem("basket"))
  }, [])

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{select.article.title}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
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
