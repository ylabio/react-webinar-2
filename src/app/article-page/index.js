import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import ArticleContent from "../../components/article-content";
import Select from "../../components/select";
import LoaderComponent from "../../components/loader-component";
import Navbar from "../../components/navbar";
import LayoutMenu from "../../components/layout-menu";

function ArticlePage() {
  console.log("ArticlePage");

  const store = useStore();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const load = async function () {
    await store.get("article").loadArticle(params.id);
  };

  useEffect(() => {
    setIsLoading(true);
    load().then(() => {
      setIsLoading(false);
    });
  }, [params.id]);

  const select = useSelector((state) => ({
    item: state.article.item,
    category: state.article.category,
    country: state.article.country,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    changeLang: useCallback((lang) => store.get("language").loadLang(lang), []),
  };

  return (
    <Layout
      head={
        !isLoading && (
          <>
            <h1>{select.item.title}</h1>
            <Select
              currentValue={select.lang.translate.lang}
              options={select.lang.langs}
              changeOption={callbacks.changeLang}
            />
          </>
        )
      }
    >
      <LayoutMenu>
        <Navbar translate={select.lang.translate} />
        <BasketSimple
          translate={select.lang.translate}
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </LayoutMenu>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <ArticleContent
          translate={select.lang.translate}
          onAdd={callbacks.addToBasket}
          item={select.item}
          category={select.category}
          country={select.country}
        />
      )}
    </Layout>
  );
}

export default React.memo(ArticlePage);
