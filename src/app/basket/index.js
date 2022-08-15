import List from "../../components/list";
import React, { useCallback } from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import translation from "../../utils/translation";

function Basket() {
  console.log("Basket");

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    current: state.localization.current,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get("modals").close(), []),
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
          link={`/article/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          click={callbacks.closeModal}
          lng={select.current}
        />
      ),
      []
    ),
  };

  return (
    <LayoutModal
      title={translation(select.current, "basket")}
      onClose={callbacks.closeModal}
      lng={select.current}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} lng={select.current} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
