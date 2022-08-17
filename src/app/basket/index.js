import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BasketTotal from "../../components/basket-total";
import ItemBasket from "../../components/item-basket";
import LayoutModal from "../../components/layout-modal";
import List from "../../components/list";
import useLanguage from "../../utils/use-language";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

function Basket(){

  console.log('Basket');

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Подробности о товаре
    showDetails: useCallback(id => {
      store.get('modals').close();
      navigate(`details/${id}`);
    }, [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket
      item={item}
      onRemove={callbacks.removeFromBasket}
      onTitleClick={callbacks.showDetails}
    />, []),
  }

  const lng = useLanguage();

  return (
    <LayoutModal title={lng("basketLabel")} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
