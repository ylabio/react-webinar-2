import React from "react";
import propTypes from "prop-types";

import List from "../list";
import BasketSum from "../basket-sum";
import ModalLayout from "../modal-layout";

import "./style.css";

function BasketModal({onVisibility, items, price}) {
  return (
    <ModalLayout title="Корзина" onVisibility={onVisibility}>
      <List 
        items={items}
        option={true} 
      />
                  
      <BasketSum price={price}/>
    </ModalLayout>
  )
}

BasketModal.propTypes = {
  onVisibility: propTypes.func.isRequired,
  items: propTypes.array.isRequired,
  price: propTypes.number,
}

export default React.memo(BasketModal);