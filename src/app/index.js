import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import Basket from "./basket";
import Article from "./article";
import Catalog from './catalog';
import Login from './login';
import Profile from './profile';
import NotFound from './not-found';

function App () {
  const store = useStore();
  const modal = useSelector(state => state.modals.name);
  useEffect(() => store.get('user').check(), []);
  // проверка токена, при наличии - авторизация

  return (<>
    <Routes>
      <Route index element={<Catalog />} />
      <Route exact path='/catalog' element={<Catalog />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route exact path='/articles/:id' element={<Article/>}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
    {modal === 'basket' && <Basket/>}
  </>);
}

export default React.memo(App);
