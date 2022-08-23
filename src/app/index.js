import React from 'react';
import useSelector from '../hooks/use-selector';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import useInit from '../hooks/use-init';
import useStore from '../hooks/use-store';
import Spinner from '../components/spinner';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const store = useStore();

  useInit(
    async () => {
      await store.get('app').init();
    },
    [],
    { backForward: true }
  );

  const select = useSelector((state) => ({
    modal: state.modals.name,
    waiting: state.app.waiting,
    initialized: state.app.initialized,
  }));

  // здесь должен показываться loader, пока приложение инициализируется
  // пока использую Spinner как заглушку, хоть он и не отображается
  if (!select.initialized) {
    return (
      <Spinner active={true}>
        <></>
      </Spinner>
    );
  }
  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile/:id'} element={<Profile />} />
      </Routes>
      {select.modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
