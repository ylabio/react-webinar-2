import List from '../../components/list';
import React, { useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import useLanguage from '../../utils/use-language';

function Basket() {
  console.log('Basket');

  const store = useStore();
  const { content } = useLanguage();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

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
          content={content}
          path='/products/'
        />
      ),
      [content]
    ),
  };

  return (
    <LayoutModal
      title={content.cart}
      onClose={callbacks.closeModal}
      closeCart={content.closeCart}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal content={content} sum={select.sum} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
