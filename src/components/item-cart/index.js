import { cn as bem } from '@bem-react/classname'
import React from 'react'
import propTypes from 'prop-types';
import Item from '../item'
import Simple from '../simple'
import "./style.css"

function ItemCart({
  item,
  handleBtn
}) {
  const cn = bem("ItemCart")
  return (
    <Item btnText='Удалить'
          item={item}
          handleBtn={handleBtn}
    >
      <Simple cn={cn} bemIndex={'count'} text={`${item.count} шт.`} />
    </Item>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  handleBtn: propTypes.func.isRequired
}

export default React.memo(ItemCart)