import List from "../../components/list";
import React, { useCallback } from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import useLanguage from "../../utils/use-language";

function Basket() {
  const store = useStore();
  const langPackage = useLanguage();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
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
          lang={langPackage}
        />
      ),
      []
    ),
  };

  return (
    <LayoutModal
      title={langPackage.basket.title}
      onClose={callbacks.closeModal}
      lang={langPackage.buttons.close}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} lang={langPackage.basket.total} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
