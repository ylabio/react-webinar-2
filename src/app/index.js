import React, { useEffect } from 'react';
import useSelector from '../hooks/use-selector';
import Basket from './basket';
import useStore from '../hooks/use-store';
import { PrivateRoutes, PublicRoutes } from '../routes';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useEffect(() => {
    store.get('authorization').checkToken(localStorage.getItem('token'));
  });

  const select = useSelector((state) => ({
    modal: state.modals.name,
    loggedIn: state.authorization.loggedIn,
  }));

  return (
    <>
      {select.loggedIn ? (
        <div>
          <PrivateRoutes />
        </div>
      ) : (
        <div>
          <PublicRoutes />
        </div>
      )}
      {select.modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
