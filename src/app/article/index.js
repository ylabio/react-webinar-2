import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from "../../components/layout";
import ArticleProfile from "../../components/article-profile";
import SubHeader from "../../components/sub-header";

function Article() {
  let params = useParams();

  const store = useStore();
  const select = useSelector((state) => ({
    _id: state.article.id,
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
      () => store.get("basket").addToBasket(profile),
      [profile]
    ),
  };

  const isNewArticle = select._id === params.id;

  const title = isNewArticle ? <h1>{select.title}</h1> : <h1>Загрузка...</h1>;

  return (
    <Layout head={title}>
      <SubHeader
        onOpenBasket={callbacks.openModalBasket}
        basketAmount={amount}
        basketSum={sum}
      />
      {isNewArticle && (
        <ArticleProfile
          onAddToBasket={callbacks.addToBasket}
          profile={profile}
        />
      )}
    </Layout>
  );
}

export default Article;
