import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    dictionary: state.language.items,
    lang: state.language.lang
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Открытие описания товара
    openModalArticle: useCallback((_id) => {store.get('article').setId(_id);
    store.get('modals').close();
    }, []),
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} 
                                                onRemove={callbacks.removeFromBasket} 
                                                openArticle={callbacks.openModalArticle}
                                                buttonText={select.dictionary.del[select.lang]}
                                                pcs={select.dictionary.pcs[select.lang]}
    />, []),
  }

  return (
    <LayoutModal title={select.dictionary.cart[select.lang]} 
                 onClose={callbacks.closeModal}
                 close={select.dictionary.close[select.lang]}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} 
                   total={select.dictionary.total[select.lang]}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
