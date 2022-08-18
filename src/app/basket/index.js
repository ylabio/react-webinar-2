import List from "../../components/list";
import React, {useCallback, useMemo} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { routes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import useLocale from "../../utils/use-locale";

function Basket(){
  const store = useStore();
  const nav = useNavigate()
  const locale = useLocale()(loc => ({
    basket: loc.basket,
    itemBasket: loc.itemBasket,
    basketTotal: loc.basketTotal
  }))

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
    // Редирект при нажатии на тайтл айтема
    redirectTo: useCallback(_id => nav(routes.articles(_id)), [])
  };

  const renders = {
    itemBasket: useCallback(item => 
      <ItemBasket translate={ locale.itemBasket } item={item} onRemove={callbacks.removeFromBasket} redirectTo={callbacks.redirectTo}/>
    , [locale.itemBasket]),
  }

  return (
    <LayoutModal title={locale.basket.title} onClose={callbacks.closeModal} translate={locale.basket}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal translate={locale.basketTotal} sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
