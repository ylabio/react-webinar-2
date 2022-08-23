import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Menu from "../../components/menu";
import BasketSimple from "../../components/basket-simple";
import LayoutFlex from '../../components/layouts/layout-flex';
import { QS_OPTIONS } from "../../store/catalog";
import qs from "qs";

function Tools() {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    params: state.catalog.params,
  }));

  const {t} = useTranslate();

  const generateLink = useCallback(() => {
    const query = '/?' + qs.stringify({
      ...select.params,
    }, QS_OPTIONS);

    return query;
  }, [select.params]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: t('menu.main'), link: generateLink()},
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
