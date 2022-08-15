import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { AppRoute } from "../../const";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item =>
      <ItemBasket
        item={item}
        onRemove={callbacks.removeFromBasket}
        onClose={callbacks.closeModal}
        address={AppRoute.Product}
      />, []),
  }

  const basketTitle = select.language === 'rus' ? 'Корзина' : 'Cart';

  return (
    <LayoutModal title={basketTitle} onClose={callbacks.closeModal} lang={select.language} >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} lang={select.language} />
    </LayoutModal>
  )
}

export default React.memo(Basket);
