import React, {useCallback, useMemo} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
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
  // Параметры из пути /articles/:id
  const params = useParams();
  const navigate = useNavigate();

  useInit(async () => {
    await store.get('article').load(params.id);
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});

  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth.user,
    article: state.article.data,
    waiting: state.article.waiting
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    toLogin: useCallback(() => navigate('/login'), []),
    logOut: useCallback(() => store.get('auth').logOut(), []),
  };

  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), logOutTitle: t('logout'), toLogin: callbacks.toLogin }), [t]),
  }

  return (
    <Layout head={
      <>
        <LoginMenu options={options.loginMenu} user={select.user} toLogin={callbacks.toLogin} logOut={callbacks.logOut}/>
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
