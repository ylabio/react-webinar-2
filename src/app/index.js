import React from 'react';
import useSelector from '../hooks/use-selector';
import Basket from './basket';
import useStore from '../hooks/use-store';
import { PrivateRoutes, PublicRoutes } from '../routes';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.get('authorization').checkToken(localStorage.getItem('token'));
  }, []);

  const select = useSelector((state) => ({
    modal: state.modals.name,
    loggedIn: state.authorization.loggedIn,
  }));

  return (
    <>
      {select.loggedIn ? <PrivateRoutes /> : <PublicRoutes />}
      {select.modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
