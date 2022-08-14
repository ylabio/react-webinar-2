import List from "../../components/list";
import React, {useCallback, useContext} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {LocalisationContext} from "l10n/localisationProvider";
import {l10n} from "l10n/strings";

function Basket(){
  console.log('Basket');

  const store = useStore();
  const {lang} = useContext(LocalisationContext);

  const heading = l10n.cart.title[lang];

  const select = useSelector(state => ({
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
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onCloseModal={callbacks.closeModal}/>, []),
  }

  return (
    <LayoutModal title={heading} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
