import List from "../../components/list";
import React, {useCallback} from "react";
import { useNavigate } from 'react-router-dom';
import routes from '../../API/routes';
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){

  console.log('Basket');

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locales: state.locales,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      navigate(routes.main())
      store.get('modals').close()
    }, []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Показать товара
    showDescription: useCallback(id => {
      navigate(routes.item(id))
    }, [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket
      text={select.locales[select.locales.lng].REMOVE_FROM_BACKET}
      item={item} 
      onShowDescription={callbacks.showDescription} 
      onRemove={callbacks.removeFromBasket}/>, [select.locales.lng]),
  }

  return (
    <LayoutModal text={select.locales[select.locales.lng].CLOSE_BASKET} title='Корзина' onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
