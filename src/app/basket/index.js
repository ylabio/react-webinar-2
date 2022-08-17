import List from '../../components/list';
import React, { useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import translator from '../../utils/translator';

function Basket() {
  console.log('Basket');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentLanguage: state.language.lang,
  }));

  const dictionary = translator(select.currentLanguage);

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.get('basket').removeFromBasket(_id),
      []
    ),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          onClose={callbacks.closeModal}
          dictionary={dictionary}
          link={`articles/${item._id}`}
        />
      ),
      []
    ),
  };

  return (
    <LayoutModal
      title={`${dictionary.cart}`}
      onClose={callbacks.closeModal}
      dictionary={dictionary}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} dictionary={dictionary} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
