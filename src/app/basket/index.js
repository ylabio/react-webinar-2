import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import { dictionaryEnum } from '../../enums/dictionaryEnum';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
	  lang: state.common.language
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

	const translate = word => {
		return dictionaryEnum[word][select.lang];
	};

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket} translate={translate} />, [select.lang]),
  };

  return (
    <LayoutModal translate={translate} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translate={translate} />
    </LayoutModal>
  )
}

export default React.memo(Basket);
