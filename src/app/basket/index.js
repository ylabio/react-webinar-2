import React, {useCallback} from 'react';
import BasketTotal from '../../components/basket-total';
import ItemBasket from '../../components/item-basket';
import LayoutModal from '../../components/layout-modal';
import List from '../../components/list';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Basket() {
  console.log('Basket');

  const store = useStore();

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

  // Переводчик статического текста
  const t = (path, amount = null) => store.get('local').translate(path, amount);

  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          onRemove={callbacks.removeFromBasket}
          onItemOpen={callbacks.closeModal}
          text={{piece: t('basket.piece'), remove: t('common.remove')}}
        />
      ),
      []
    )
  };

  return (
    <LayoutModal
      title={t('basket.header')}
      onClose={callbacks.closeModal}
      closeButtonLabel={t('common.close')}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} totalLabel={t('basket.totalLabel')} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
