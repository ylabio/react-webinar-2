import List from "../../components/list";
import React, {useCallback, useMemo} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import translate from "../../utils/translate";
import allCodes from "../../utils/translate/codes";

function Basket(){

  console.log('Basket');

  // коды для мультиязычности которые передаются через пропсы для глупых компонентов
  const codes = useMemo(() => JSON.parse(JSON.stringify(allCodes)), []);

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    
    language: state.localization.language
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal} language={select.language} translate={translate} link={`/singlepage/${item._id}`} codesBasketItem={codes.itemBasket}/>, []),
  }

  return (
    <LayoutModal title={translate(select.language, codes.titles.CODE_19)} onClose={callbacks.closeModal} language={select.language} translate={translate} codesLayoutModal={codes.layoutModal}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} language={select.language} translate={translate} codesBasketTotal={codes.basketTotal}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
