import List from "../../components/list";
import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import useTranslation from "../../utils/use-translation";

function Basket(){
  
  const translationBasket = useTranslation('basket');
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    locale: state.app.locale,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // переход на страницу с описанием товар
    viewProduct: useCallback((id) => {
      store.get('modals').close();
      navigate(`/product/${id}`)
    }, []),
    translationBasket: useCallback(translationBasket, [select.locale]),
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} 
                                                viewProduct={callbacks.viewProduct}
                                                onRemove={callbacks.removeFromBasket}
                                                translation={callbacks.translationBasket}/>, []),
  }

  return (
    <LayoutModal actionName={callbacks.translationBasket("close")} 
                 title={callbacks.translationBasket('title')} 
                 onClose={callbacks.closeModal}>

      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal translation={callbacks.translationBasket} sum={select.sum}/>

    </LayoutModal>
  )
}

export default React.memo(Basket);
