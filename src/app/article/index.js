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
import LoginControl from "../../components/login-control";

function Article(){
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.id);
    await store.get('autorization').getProfile();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    user: state.autorization.user,
    autorization: state.autorization.autorization
      
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <>
      <LoginControl 
              t={t} 
              userName={select.user.profile ? select.user.profile.name : null}
              onLogOut={callbacks.onLogOut}/>
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
