import List from "../../components/list";
import React, { useCallback } from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import useTranslate from "../../utils/use-translate";

function Basket() {
  console.log("Basket");
  const t = (phrase) => useTranslate(phrase);

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get("modals").close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.get("basket").removeFromBasket(_id),
      []
    ),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          onClose={callbacks.closeModal}
        />
      ),
      [select.lang]
    ),
  };

  return (
    <LayoutModal title={t("basket.title")} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
