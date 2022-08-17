import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { Link } from "react-router-dom";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Переводчик
    translate: useCallback((code) => store.get('language').getTranslate(code, select.lang), [select.lang])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket 
      item={item} 
      onRemove={callbacks.removeFromBasket}  
      translate={callbacks.translate} 
      link={<Link to={`article/${item._id}`} onClick={callbacks.closeModal}>{item.title}</Link>}
    />, []),
  }

  return (
    <LayoutModal title={callbacks.translate("cart")} onClose={callbacks.closeModal} translate={callbacks.translate}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translate={callbacks.translate}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
