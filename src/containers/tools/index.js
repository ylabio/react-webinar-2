import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Menu from "../../components/menu";
import BasketSimple from "../../components/basket-simple";
import LayoutFlex from "../../components/layout-flex";

function Tools() {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/'},
    ]), []),
  }

  return (
    <LayoutFlex flex="between">
      <Menu items={options.menu}/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
    </LayoutFlex>
  );
}

export default React.memo(Tools);
