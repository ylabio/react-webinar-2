import React, {useCallback, useMemo} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux} from 'react-redux';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Menu from "../../components/menu";
import BasketSimple from "../../components/basket-simple";
import LayoutFlex from "../../components/layout-flex";
import actionsModals from '../../store-redux/modals/actions';

function ToolsContainer() {

  //const store = useStore();
  const storeRedux = useStoreRedux();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      //store.get('modals').open('basket');
      storeRedux.dispatch(actionsModals.open('basket'));
    }, []),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: t('menu.main'), link: '/'},
    ]), [t]),
  }

  return (
    <LayoutFlex flex="between" indent="big">
      <Menu items={options.menu}/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
                    t={t}/>
    </LayoutFlex>
  );
}

export default React.memo(ToolsContainer);
