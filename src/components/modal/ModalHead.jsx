import React from 'react'

const ModalHead = () => {
   return (
      <div className='Modal-head'>
         <h1>Корзина</h1>
         <button>Закрыть</button>
      </div>
   )
}

export default React.memo(ModalHead)