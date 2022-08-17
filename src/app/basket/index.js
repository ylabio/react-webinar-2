import List from "../../components/list";
import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import localization from './localization';

function Basket(){

  console.log('Basket');

  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.localization.lang
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    //Переход на страницу товара
    goToItemPage: useCallback((_id) => {
      store.get('modals').close();
      navigate(`/item/${_id}`);
    }, []),
  };

  const renders = {
    itemBasket: useCallback(item => (
      <ItemBasket item={item} onRemove={callbacks.removeFromBasket} lang={select.lang} linkFunc={callbacks.goToItemPage}/>
    ), [select.lang])
  }

  return (
    <LayoutModal title={localization[select.lang].title} onClose={callbacks.closeModal} lang={select.lang}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} lang={select.lang}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
