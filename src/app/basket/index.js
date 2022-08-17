import List from "../../components/list";
import React, {useCallback, useContext} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {LocalisationContext} from "l10n";
import {translation} from "l10n/strings/translation";
import {routes} from "utils/constants/routes";

function Basket(){
  console.log('Basket');
  const store = useStore();
  const {lang} = useContext(LocalisationContext);

  const heading = translation[lang].cart.heading;
  const total = translation[lang].cart.total;
  const itemNavLink = routes.productInfo;
  const removeButton = translation[lang].layout.buttons.remove;
  const closeButton = translation[lang].layout.buttons.close;

  console.log(removeButton);

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
    itemBasket: useCallback(item => <ItemBasket item={item} navLink={itemNavLink} button={removeButton} onRemove={callbacks.removeFromBasket} onCloseModal={callbacks.closeModal}/>, [lang]),
  }

  return (
    <LayoutModal title={heading} onClose={callbacks.closeModal} button={closeButton}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} heading={total}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
