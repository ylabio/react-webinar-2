import {useNavigate} from "react-router-dom";
import useLanguage from "utils/use-language";
import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket() {

  console.log('Basket');

  const store = useStore();
  const translation = useLanguage();
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
    //навигация на катру товара
    onPageProduct: useCallback(id => {
      navigate(`/${id}`);
      callbacks.closeModal();
    }, []),
  };

  const renders = {
      itemBasket: useCallback(item => {
        return <ItemBasket item={item}
                           onRemove={callbacks.removeFromBasket}
                           onName={() => callbacks.onPageProduct(item._id)}/>
      }, []),
    }
  ;

  return (
    <LayoutModal title={translation('basket')} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </LayoutModal>
  );
}

export default React.memo(Basket);
