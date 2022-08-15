import React, { useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import List from '../../components/list';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';

function Basket() {
  const store = useStore();
  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLang: state.language.currentLang,
    langPack: state.language.langPack
  }));

  console.log('Basket');

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
        itemLink={`card/${item._id}`}
        onRemove={callbacks.removeFromBasket}
        closeModal={callbacks.closeModal}
        langPack={select.langPack.basket}
      />, [select.currentLang])
  };

  return (
    <LayoutModal
      title={select.langPack.basket.title}
      closeButtonTitle={select.langPack.basket.closeButton}
      onClose={callbacks.closeModal}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} langPack={select.langPack.basket} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
