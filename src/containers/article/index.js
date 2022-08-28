import React, { useCallback } from "react";
import { useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";

function ArticleContainer() {
  const store = useStore();

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowEqual
  );

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  return (
    <Spinner active={select.waiting}>
      <ArticleCard
        article={select.article}
        onAdd={callbacks.addToBasket}
        t={t}
      />
    </Spinner>
  );
}

export default React.memo(ArticleContainer);
