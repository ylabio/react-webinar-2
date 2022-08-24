import React, {useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LoginMenu from "../../components/login-menu";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";

function Article(){
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), logOutTitle: t('logout'), toLogin: callbacks.toLogin }), [t]),
  }

  return (
    <Layout head={
      <>
        <LoginMenu options={options.loginMenu}/>
        <LayoutFlex flex="between">
          <h1>{select.article.title}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      </>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
