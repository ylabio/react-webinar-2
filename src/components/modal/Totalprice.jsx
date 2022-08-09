import React from 'react'

const Totalprice = ({ totalPrice }) => {
   return (
      <div className='Cart-totalprice'>
         <strong className='Totalprice-title'>Итого: </strong><strong className='Totalprice-value'>{totalPrice} ₽</strong>
      </div>
   )
}

export default Totalprice