import List from "../../components/list";
import React, { useCallback } from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { translate } from "../../utils/translate";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    valLang: state.names.val
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
  };

  const translations = {
    main: translate(select.valLang, 'main'),
    inBasketText: translate(select.valLang, 'inBasketText'),
    item1Name: translate(select.valLang,'item1Names'),
    item2Name: translate(select.valLang,'item2Names'),
    item3Name: translate(select.valLang,'item3Names'),
    goButtonName: translate(select.valLang, 'goButtonName'),
    totalText: translate(select.valLang, 'totalText'),
    pcsText: translate(select.valLang, 'pcsText'),
    deleteButtonName: translate(select.valLang, 'deleteButtonName'),
    closeButtonName: translate(select.valLang, 'closeButtonName'),
    basketHead: translate(select.valLang, 'basketHead')
  }

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item}
                                                onRemove={callbacks.removeFromBasket}
                                                onClose={callbacks.closeModal}
                                                link={`/articles/${item._id}`}
                                                pcsText={translations.pcsText}
                                                deleteButtonName={translations.deleteButtonName}
                                                />
                                                , []),
  }

  return (
    <LayoutModal title={translations.basketHead} onClose={callbacks.closeModal} closeButtonName={translations.closeButtonName}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} totalText={translations.totalText}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
