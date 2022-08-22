import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import ArticleForm from "../../components/forms/article-form";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import UserBar from "../../containers/user-bar";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Article() {
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

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{select.article.title}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      top={
        <UserBar/>
      }>
      <Tools />
      <Spinner active={select.waiting}>
        <ArticleForm article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
