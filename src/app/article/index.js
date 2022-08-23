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
import HeaderSign from "../../components/header_sign";
import LayoutFlex from "../../components/layout-flex";
import LayoutGrid from "../../components/layout-grid";
import LocaleSelect from "../../containers/locale-select";

function Article(){
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  const token = localStorage.getItem('token')

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    result: state.form.result,
    surname: state.form.result?.result?.profile?.surname,
  }));

  console.log(select.surname)

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    fetchLogout:  useCallback(() => store.get('form').logout(), []),
  };

  return (
    <Layout head={
      <LayoutGrid flex="between">
      <HeaderSign 
      logout={callbacks.fetchLogout} 
      result={select.result.result}
      profile={select.surname}
      />
      <h1>{t(select.article.title)}</h1>
      <LocaleSelect/>
    </LayoutGrid>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
