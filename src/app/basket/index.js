import React, {useCallback} from 'react';
import BasketTotal from '../../components/basket/basket-total';
import ItemBasket from '../../components/basket/item-basket';
import LayoutModal from '../../components/layouts/layout-modal';
import List from '../../components/common/list';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(
      item => (
        <ItemBasket
          item={item}
          link={`/articles/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          onLink={callbacks.closeModal}
          labelUnit={t('basket.unit')}
          labelDelete={t('basket.delete')}
        />
      ),
      []
    )
  };

  return (
    <LayoutModal
      title={t('basket.title')}
      labelClose={t('basket.close')}
      onClose={callbacks.closeModal}
    >
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
