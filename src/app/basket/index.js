import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    basketHead: state.names.names.basketHead,
    closeButtonName: state.names.names.closeButtonName
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Открытие страницы товара
    pageLoad: useCallback((_id) => store.get('page').pageLoad(_id), []),
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item}
                                                onRemove={callbacks.removeFromBasket}
                                                onClose={callbacks.closeModal}
                                                pageLoad={callbacks.pageLoad}
                                                />
                                                , []),
  }

  return (
    <LayoutModal title={select.basketHead} onClose={callbacks.closeModal} closeButtonName={select.closeButtonName}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
