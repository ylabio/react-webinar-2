import List from '../../components/list';
import React, { useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';
import useStore from '../../utils/hooks/use-store';
import useSelector from '../../utils/hooks/use-selector';
import useLang from '../../utils/hooks/use-lang';

function Basket(){
const { layoutModal, itemBasket, basketTotal } = useLang();
  // console.log('Basket');

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

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} onClose={callbacks.closeModal} onRemove={callbacks.removeFromBasket} ln={itemBasket}/>, [itemBasket]),
  }

  return (
    <LayoutModal onClose={callbacks.closeModal} ln={layoutModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      {!!select.items.length && <BasketTotal sum={select.sum} ln={basketTotal}/>}
    </LayoutModal>
  )
}

export default React.memo(Basket);
