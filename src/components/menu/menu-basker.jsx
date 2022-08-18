import React from 'react'
import BasketSimple from '../basket-simple'
import { Menu } from '../basket-simple/menu'

export const MenuBasker = ({ onOpen, amount, sum }) => {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
      <Menu  />
      <BasketSimple  onOpen={onOpen} amount={amount} sum={sum} />
    </div>
  )
}
