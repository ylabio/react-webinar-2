import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import translate from "../../utils/translate";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    language: state.locales.language,
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} link={item._id} onRemove={callbacks.removeFromBasket} language={select.language} onClick={callbacks.closeModal}/>, []),
  }

  return (
    <LayoutModal title={translate(select.language, "basket-title")} language={select.language} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} language={select.language}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
