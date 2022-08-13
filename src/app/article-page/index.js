import React, { useCallback, useEffect } from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Article from "../../components/article";
import BasketSimple from "../../components/basket-simple";
import Spinner from "../../components/spinner";

function ArticlePage() {
  const store = useStore();
  const params = useParams();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    article: state.article.article,
    loading: state.article.isLoading,
  }));

  useEffect(() => {
    store.get("article").load(params.id);
  }, [params.id]);

  const callbacks = {
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <Article article={select.article} onAdd={callbacks.addToBasket} />
      {/* {select.isLoading ? (
        <Article article={select.article} onAdd={callbacks.addToBasket} />
      ) : (
        <Spinner />
      )} */}
    </Layout>
  );
}

export default React.memo(ArticlePage);
