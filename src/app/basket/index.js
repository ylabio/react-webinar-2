import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import getTranslation from "../../services/locale";
import {useNavigate} from "react-router-dom";

function Basket(){

  console.log('Basket');

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.value,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(id => store.get('basket').removeFromBasket(id), []),
    onItemClick: useCallback(id => {
      navigate(`/article/${id}`, { replace: true });
    }, []),
    getTranslation: useCallback(code => {
      return getTranslation(select.language, code);
    }, [select.language]),
  };

  const renders = {
    itemBasket: useCallback(item => (
    <ItemBasket item={item}
                onRemove={callbacks.removeFromBasket}
                onItemClick={callbacks.onItemClick}
                getTranslation={callbacks.getTranslation}/>)
    , []),
  }

  return (
    <LayoutModal title={callbacks.getTranslation('basketModal') || 'Корзина'}
                 onClose={callbacks.closeModal}
                 getTranslation={callbacks.getTranslation}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}
                   getTranslation={callbacks.getTranslation}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
