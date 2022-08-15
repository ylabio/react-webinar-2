import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Main from './main'
import Basket from './basket'
import NotFound from './not-found'
import Product from './product'
import useStore from '../utils/use-store'
import useSelector from '../utils/use-selector'

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App')

  const modal = useSelector((state) => state.modals.name)

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  )
}

export default React.memo(App)
