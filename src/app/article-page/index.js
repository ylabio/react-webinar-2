import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Article from "../../components/article";
import Spinner from "../../components/spinner";
import LayoutHeader from "../../components/layout-header";

function ArticlePage() {
  const store = useStore();
  const params = useParams();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article.article,
    loading: state.article.isLoading,
    current: state.localization.current,
    lang: state.localization.lang,
  }));

  useEffect(() => {
    store.get("article").load(params.id);
  }, [params.id]);

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    changeLng: useCallback(
      (lng) => store.get("localization").select(lng),
      [store]
    ),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <LayoutHeader
        amount={select.amount}
        sum={select.sum}
        lang={select.lang}
        current={select.current}
        onChange={callbacks.changeLng}
        onOpen={callbacks.openModalBasket}
      />
      {select.loading ? (
        <Spinner />
      ) : (
        <Article
          article={select.article}
          onAdd={callbacks.addToBasket}
          lang={select.current}
        />
      )}
    </Layout>
  );
}

export default React.memo(ArticlePage);
