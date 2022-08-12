import React from "react";
import { useParams } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const ItemDescription = ({ item, setItem, onAdd }) => {
  const { id } = useParams();
  const cn = bem("ItemDescription");

  const [loading, setLoading] = React.useState(true);

  const callbacks = {
    onAdd: React.useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  React.useEffect(() => {
    async function fetchItemDescription() {
      try {
        const response = await fetch(
          `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
        );
        const json = await response.json();

        setItem(json.result);
        setLoading(false);
      } catch (error) {
        alert("Ошибка при получении товара!");
      }
    }

    fetchItemDescription();

    return () => {
      setItem({});
    };
  }, [id]);

  if (loading) {
    return (
      <div className={cn()}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={cn()}>
      <div className={cn("desc")}>{item.description}</div>
      <div className={cn("desc-country")}>
        Страна производитель: <b>{item.maidIn?.title}</b>
      </div>
      <div className={cn("category")}>
        Категория: <b>{item.category?.title}</b>
      </div>
      <div className={cn("year-of-issue")}>
        Год выпуска: <b>{item.edition}</b>
      </div>
      <div className={cn("price")}>
        <h3>Цена: {item.price}</h3>
      </div>
      <div>
        <button onClick={callbacks.onAdd} className={cn("add-button")}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default React.memo(ItemDescription);
