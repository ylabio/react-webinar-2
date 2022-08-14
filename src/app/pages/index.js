import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from "../../components/layout";
import Info from "../../components/info";
import BasketSimple from "../../components/basket-simple";

function Page() {
  let { id = "none" } = useParams();

  const store = useStore();

  const select = useSelector((state) => ({
    item: state.details.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    modal: state.modals.name,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get("modals").open("basket"), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get("modals").close(), []),
  };

  useEffect(() => {
    store.get("details").loadDetails(id);
    if (select.modal) {
      callbacks.closeModal();
    }
  }, [id]);

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple
        sum={select.sum}
        amount={select.amount}
        onOpen={callbacks.openModalBasket}
      />
      <Info item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  );
}

export default React.memo(Page);
