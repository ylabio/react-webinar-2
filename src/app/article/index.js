import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ArticleProfile from "../../components/article-profile";

function Article() {
  let params = useParams();

  const store = useStore();
  const select = useSelector((state) => ({
    id: state.article.id,
    title: state.article.title,
    description: state.article.description,
    price: state.article.price,
    country: state.article.country,
    edition: state.article.edition,
    category: state.article.category,
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));

  const { sum, amount, ...profile } = select;

  useEffect(() => {
    store.get("article").load(params.id);
  }, [params.id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback(
      () => store.get("basket").addToBasket(select.id),
      [select.id]
    ),
  };

  console.log(profile.id);
  const title = profile.id ? (
    <h1>{select.title}</h1>
  ) : (
    <h1>Такой товар не найден</h1>
  );

  return (
    <Layout head={title}>
      <BasketSimple
        sum={sum}
        amount={amount}
        onOpen={callbacks.openModalBasket}
      ></BasketSimple>
      {profile.id && (
        <ArticleProfile
          onAddToBasket={callbacks.addToBasket}
          profile={profile}
        />
      )}
    </Layout>
  );
}

export default Article;
