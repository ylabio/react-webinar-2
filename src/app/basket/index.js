import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useNavigate } from "react-router-dom";

function Basket(){
  const navigate = useNavigate();

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
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    redirect: useCallback((id) => {
      navigate(`product/${id}`);
      callbacks.closeModal();
    }, []),
  };

  const renders = {
    itemBasket: useCallback(item => 
      <ItemBasket
        item={item}
        path={`product/${item._id}`}
        onClose={callbacks.closeModal}
        onRemove={callbacks.removeFromBasket}
        redirect={callbacks.redirect}
      />, []
    ),
  }

  return (
    <LayoutModal title='Корзина' onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
