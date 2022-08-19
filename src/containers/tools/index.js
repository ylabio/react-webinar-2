import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Menu from "../../components/menu";
import BasketSimple from "../../components/baskets/basket-simple";
import LayoutFlex from "../../components/layout-flex";

function Tools() {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: t('menu.main'), link: '/'},
    ]), [t]),
  }

  return (
    <LayoutFlex flex="between">
      <Menu items={options.menu}/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} t={t}/>
    </LayoutFlex>
  );
}

export default React.memo(Tools);
