import React from 'react'

const ModalHead = ({ setModalStatus }) => {
   return (
      <div className='Modal-head'>
         <h1 className='Modal-head-title'>Корзина</h1>
         <button onClick={() => setModalStatus()}>Закрыть</button>
      </div>
   )
}

export default React.memo(ModalHead)