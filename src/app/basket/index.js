import List from '../../components/list';
import React, { useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import { useNavigate } from 'react-router-dom';

function Basket() {
  const navigate = useNavigate();
  console.log('Basket');

  const store = useStore();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback((_id) => store.get('basket').removeFromBasket(_id), []),
    openItem: useCallback((_id) => {
      store.get('modals').close(), [];
      navigate(`/article/${_id}`);
    }),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          openItem={callbacks.openItem}
        />
      ),
      [],
    ),
  };

  return (
    <LayoutModal title='Корзина' onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
