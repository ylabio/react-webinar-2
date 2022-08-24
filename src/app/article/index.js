import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate, useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import { getCookie } from "../../utils/coockie";
import AuthControls from "../../components/auth-controls";

function Article(){
  const token = getCookie('token');
  const name = localStorage.getItem('name');
  const store = useStore();
  const navigate = useNavigate();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    logoutWaiting: state.authorize.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

    logout: useCallback(() => store.get('authorize').logout(token), []),

    redirect: useCallback(() => { navigate('/authorization') }, []),
  };

  return (
    <Layout
      control={
        <AuthControls
          token={token}
          name={name}
          logout={callbacks.logout}
          redirect={callbacks.redirect}
        />
      }
      head={
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
