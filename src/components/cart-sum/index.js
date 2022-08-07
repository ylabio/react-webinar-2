import React from 'react';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css'


function CartSumm(props) {

  const cn = bem('CartStatus')

  let SummItems=props.cart.reduce((sum,curr)=>sum+curr.price*curr.amount,0);
  let SummAmount=props.cart.reduce((sum,curr)=>sum+curr.amount,0);
  
   if(props.place=='cart') {
    return (
      <div className={cn('')}>
        {SummItems} {<>&#8381;</>}
      </div>
  )
   }
   else if(props.place=='store'&& SummAmount>0){
     return (
       <div className={cn('')}>
       {plural(SummAmount, '%d товаров','%d товара','%d товаров')} / {SummItems}  {<>&#8381;</>}
      </div>
    )
  }
  else return <div className={cn('')}> пусто </div> 
}

export default React.memo(CartSumm);
