import React, { useCallback } from "react";
import ItemDescription from "../../components/item-description";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import { useParams } from "react-router-dom";

const Article = () => {
  const store = useStore();

  const [article, setArticle] = React.useState({});

  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  React.useEffect(() => {
    async function fetchItemDescription() {
      try {
        const response = await fetch(
          `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
        );
        const json = await response.json();

        setArticle(json.result);
        setLoading(false);
      } catch (error) {
        alert("Ошибка при получении товара!");
      }
    }

    fetchItemDescription();
  }, [id]);

  return (
    <Layout head={<h1>{article.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemDescription
        item={article}
        onAdd={callbacks.addToBasket}
        loading={loading}
      />
    </Layout>
  );
};

export default React.memo(Article);
