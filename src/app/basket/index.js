import List from "../../components/list";
import React, {useCallback, useEffect} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){
  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    basketLang: state.basket.basketLang,
    language: state.language.language,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket 
      item={item} 
      onRemove={callbacks.removeFromBasket}
      closeModal={callbacks.closeModal} />, 
    []),
  }

  useEffect(() => {
    if (select.basketLang === select.language) {
      console.log('same')
    } else {
      console.log(select.basketLang, select.language)
      console.log('not same')
      const ids = select.items.map(item => item._id);
      console.log({ids})
      store.get('basket').refreshGoods(ids);
    }
   
  }, [])

  return (
    <LayoutModal title='Корзина' onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} />
    </LayoutModal>
  )
}

export default React.memo(Basket);
