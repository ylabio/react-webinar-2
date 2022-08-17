import Layout from '../../components/layout';
import React, { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Controls from '../../components/controls';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';

import propTypes from 'prop-types';

function Main({ title }) {
  console.log('Main');

  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  return (
    <Layout head={<h1>{title}</h1>}>
      <Controls
        amount={select.amount}
        sum={select.sum}
        openModalBasket={callbacks.openModalBasket}
      />
      <Outlet />
    </Layout>
  );
}

Main.propTypes = {
  title: propTypes.string.isRequired,
};

export default React.memo(Main);
