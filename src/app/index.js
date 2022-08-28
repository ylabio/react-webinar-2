import React from 'react';
import {useSelector as useSelectorRedux} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import Protected from '../containers/protected';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import Article from './article';
import Basket from './basket';
import Login from './login';
import Main from './main';
import Profile from './profile';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(async () => {
    await store.get('session').remind();
  });

  //const modal = useSelector(state => state.modals.name);
  const modal = useSelectorRedux(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
            <Protected redirect={'/login'}>
              <Profile />
            </Protected>
          }
        />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
