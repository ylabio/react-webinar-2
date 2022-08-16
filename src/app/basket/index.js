import List from "../../components/list";
import React, {useCallback, useState, useEffect} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {translateLanguage} from "../../utils/translateLanguage";

function Basket() {
  
  console.log('Basket');
  
  const store = useStore();
  
  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.translation.language,
  }));
  
  const [words, setWords] = useState({});
  
  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Получение данных товара
    getProductInformation: useCallback((id) => store.get('product').getProductInformation(id), [])
  };
  
  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket}
                                                getProductInformation={callbacks.getProductInformation}
                                                closeModal={callbacks.closeModal} words={{
      pcs: words.pcs,
      delete: words.delete,
    }
    } path='/productInformation/'/>, [words]),
  }

  useEffect(() => {
    setWords(translateLanguage(select.language))
  }, [select.language]);
  
  return (
    <LayoutModal title={words.cart} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} words={{total: words.total}}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
