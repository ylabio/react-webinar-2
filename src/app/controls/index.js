import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import LayoutControls from '../../components/layout-controls';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Controls() {
  const store = useStore();
  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount
  }));
  const callbacks = {
    setFirstPage: useCallback(() => store.get('catalog').setPage(1), []),
    openModalBasket: useCallback(() => store.get('modals').open('basket'), [])
  };
  // Переводчик статического текста
  const t = (path, amount = null) => store.get('local').translate(path, amount);
  const text = {
    home: t('common.homeLink'),
    empty: t('common.basketEmpty'),
    amount: t('common.basketAmount', select.amount),
    open: t('common.openCart'),
    fullness: t('common.basketFullnessLabel')
  };

  return (
    <LayoutControls>
      <Link to={'/'} onClick={callbacks.setFirstPage}>
        {text.home}
      </Link>
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
