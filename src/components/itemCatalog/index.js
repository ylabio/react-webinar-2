import React from 'react'
import Item from '../item'
import propTypes from 'prop-types';
import "./style.css"

function ItemCatalog({
  item,
  handleBtn
}) {
  return (
    <Item btnText='Добавить'
          item={item}
          handleBtn={handleBtn}
    />
  )
}

ItemCatalog.propTypes = {
  item: propTypes.object.isRequired,
  handleBtn: propTypes.func.isRequired
}

export default React.memo(ItemCatalog)