import React from 'react'

const Totalprice = ({ totalPrice }) => {
   const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
   });


   return (
      <div className='Cart-totalprice'>
         <strong className='Totalprice-title'>Итого: </strong><strong className='Totalprice-value'>{formatter.format(totalPrice)}</strong>
      </div>
   )
}

export default Totalprice