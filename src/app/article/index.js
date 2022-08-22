import React, {useCallback} from "react";
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
import LoginBar from "../../components/login-bar";
import {useAuth} from "../../hooks/use-auth";

function Article(){
  const store = useStore();
  const {user, isAuth} = useAuth();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await store.get('user').restore();
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    logOut: useCallback(() => store.get('user').logOut(), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
  };

  return (
    <>
      <LoginBar userName={isAuth && user.username} logOut={callbacks.logOut} t={t}/>
      <Layout head={
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
      </>
  )
}

export default React.memo(Article);
