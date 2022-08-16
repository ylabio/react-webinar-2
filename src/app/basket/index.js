import List from "../../components/list";
import React, {useCallback, useContext} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {LanguageContext} from "../../services/locale/context";
import Translation from "../../services/locale";
import {useNavigate} from "react-router-dom";

function Basket(){

  console.log('Basket');

  const store = useStore();
  const {language} = useContext(LanguageContext);
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
    removeFromBasket: useCallback(id => store.get('basket').removeFromBasket(id), []),
    onItemClick: useCallback(id => {
      navigate(`/article/${id}`, { replace: true });
    }, []),
  };

  const renders = {
    itemBasket: useCallback(item => (
    <ItemBasket item={item}
                onRemove={callbacks.removeFromBasket}
                onItemClick={callbacks.onItemClick}/>)
    , []),
  }

  return (
    <LayoutModal title={Translation[language].basket.title} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
