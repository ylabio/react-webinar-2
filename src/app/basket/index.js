import List from "../../components/list";
import React, {useCallback, useMemo} from "react";
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
    language: state.localizations.name,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };


  const basketWord = useMemo(() => store.get('localizations').receive('cart').cart, [select.language])
  const basketItemWords = useMemo(() => store.get('localizations').receive('pcs', 'remove'), [select.language])
  const basketTotalWords = useMemo(() => store.get('localizations').receive('summary'), [select.language])
  const modalWords = useMemo(() => store.get('localizations').receive('close'), [select.language])
  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} words={basketItemWords} onRemove={callbacks.removeFromBasket} onClickItem={callbacks.closeModal}/>, [select.language]),
  }
  return (
    <LayoutModal title={basketWord} onClose={callbacks.closeModal} words={modalWords}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} words={basketTotalWords}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
