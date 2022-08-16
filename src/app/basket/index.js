import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import List from '../../components/list';
import BasketTotal from '../../components/basket-total';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';

function Basket() {
  console.log('Basket');

  const store = useStore();

  let navigate = useNavigate();

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
  };

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          navigate={navigate}
          item={item}
          onRemove={callbacks.removeFromBasket}
          onClose={callbacks.closeModal}
          path={'/item'}
        />
      ),
      []
    ),
  };

  return (
    <LayoutModal title="Корзина" onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </LayoutModal>
  );
}

export default memo(Basket);
