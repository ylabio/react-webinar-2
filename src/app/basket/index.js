import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import dictionary from '../../dictionary';

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
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} 
                                                onRemove={callbacks.removeFromBasket} 
                                                onClose={callbacks.closeModal}
                                                buttonText={dictionary.del[select.lang]}
                                                pcs={dictionary.pcs[select.lang]}
                                                urlTo={'/article/'+item._id}
    />, []),
  }

  return (
    <LayoutModal title={dictionary.cart[select.lang]} 
                 onClose={callbacks.closeModal}
                 close={dictionary.close[select.lang]}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} 
                   total={dictionary.total[select.lang]}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
