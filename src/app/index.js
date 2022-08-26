import React from 'react'
import useSelector from '../hooks/use-selector'
import { Routes, Route } from 'react-router-dom'
import Main from './main'
import Basket from './basket'
import Article from './article'
import Profile from './profile'
import Login from './login'
import useStore from '../hooks/use-store'
import useInit from '../hooks/use-init'
import RequreAuth from '../hoc/requre-auth'

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name)
  const store = useStore()

  useInit(
    async () => {
      await store.get('profile').getProfile()
    },
    [],
    { backForward: false }
  )

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route
          path={'/profile'}
          element={
            <RequreAuth>
              <Profile />
            </RequreAuth>
          }
        />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  )
}

export default React.memo(App)
