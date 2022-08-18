import List from "../../components/list";
import React, {useCallback} from "react";
import {useTranslation} from 'react-i18next';
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){

  console.log('Basket');

  const store = useStore();
  const { t } = useTranslation();

  const select = useSelector(state => ({
    articleRoute: state.article.articleRoute,
    items: state.basket.cartItems,
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
    itemBasket: useCallback(item =>
      <ItemBasket
        item={item}
        articleRoute={select.articleRoute}
        onRemove={callbacks.removeFromBasket}
        onClose={callbacks.closeModal}
      />, []),
  }

  return (
    <LayoutModal title={t('BasketTitle')} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
