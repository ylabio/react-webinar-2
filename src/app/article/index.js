import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import {getToken, removeToken} from "../../services/token";
import api from "../../services/api";

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
    name: state.user.name,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    removeToken: useCallback(() => store.get('user').logout(), []),
  };

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/users/self/');
      store.get('user').setName(res.data.result.profile.name)
    };

    if (getToken()) load();
  }, [])

  return (
    <Layout t={t} name={select.name} removeToken={callbacks.removeToken} head={
      <LayoutFlex flex="between">
        <h1>{select.article.title}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
