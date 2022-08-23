import React, { lazy, Suspense } from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Spinner from '../components/ui/spinner';
import PrivateRoutes from '../containers/private-routes';
import useAuth from '../hooks/use-auth';

const Main = lazy(() => import('./main'));
const Basket = lazy(() => import('./basket'));
const Article = lazy(() => import('./article'));
const Login = lazy(() => import('./login'));
const Profile = lazy(() => import('./profile'));

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);
  const [isChecked] = useAuth();

  return (
    <Spinner active={!isChecked}>
      <Routes>
        <Route path={''} element={
          <Suspense fallback={<Spinner active={true} />}>
            <Main/>
          </Suspense>}
        />
        
        <Route path={"/articles/:id"} element={
          <Suspense fallback={<Spinner active={true} />}>
            <Article/>
          </Suspense>}
        />

        <Route path={"/login"} element={
          <Suspense fallback={<Spinner active={true} />}>
            <Login />
          </Suspense>}
        />

        <Route element={<PrivateRoutes />}>
          <Route path={"/profile"} element={
            <Suspense fallback={<Spinner active={true} />}>
              <Profile />
            </Suspense>}
          />
        </Route>

      </Routes>
      {modal === 'basket' && <Suspense fallback={<Spinner active={true} />}>
          <Basket/>
      </Suspense>}
    </Spinner>
  );
}

export default React.memo(App);
