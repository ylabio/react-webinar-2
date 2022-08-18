import React, {useCallback} from 'react';
import BasketSimple from '../../components/basket-simple';
import LayoutControls from '../../components/layout-controls';
import Menu from '../../components/menu';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Controls() {
  const store = useStore();
  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
    lang: state.local.lang
  }));
  const callbacks = {
    setFirstPage: useCallback(() => store.get('catalog').setPage(1), []),
    openModalBasket: useCallback(() => store.get('modals').open('basket'), [])
  };
  // Переводчик статического текста
  const t = useCallback(
    (path, amount = null) => store.get('local').translate(path, amount),
    [select.lang]
  );

  const text = {
    home: t('common.homeLink'),
    empty: t('common.basketEmpty'),
    amount: t('common.basketAmount', select.amount),
    open: t('common.openCart'),
    fullness: t('common.basketFullnessLabel')
  };

  return (
    <LayoutControls>
      <Menu text = {text} onSetPage={callbacks.setFirstPage}/>

      <BasketSimple
        sum={select.sum}
        amount={select.amount}
        onOpen={callbacks.openModalBasket}
        text={text}
      />
    </LayoutControls>
  );
}

export default React.memo(Controls);
