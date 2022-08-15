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
    language: state.translation.language,
    words: state.translation.words
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Получение данных товара
    getProductInformation: useCallback((id) => store.get('product').getProductInformation(id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket} getProductInformation={callbacks.getProductInformation} closeModal={callbacks.closeModal} words={{
      pcs: select.words.pcs,
      delete: select.words.delete,
    }
    }/>, []),
  }

  return (
    <LayoutModal title={select.words.cart} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} words={{total: select.words.total}}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
