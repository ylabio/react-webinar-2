import React from "react";
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";
import "./style.css";
import propTypes from "prop-types";
import {calcPrice} from '../../utils.js';

const CartList = ({items, onDeleteItem}) => {
    const cn = bem("Cart-list");

    return(
        <>  
            <div className={cn()}>
                {items.map((item) => 
                    <CartItem
                        className={cn("Item")}
                        index={item.code}
                        key={item.code}
                        item={item}
                        onDeleteItem={onDeleteItem}
                    />
                )}
            </div>
            <div className={cn("price")}>
                <p style={{marginRight: "49px"}}>Итого</p> 
                <p>{calcPrice(items)} ₽</p>
            </div>
        </>
    )
}

CartList.propTypes = {
    items: propTypes.array.isRequired,
    onDeleteItem: propTypes.func.isRequired,
    calcPrice: propTypes.func.isRequired,
};
  
CartList.defaultProps = {
    items: [],
    onDeleteItem: () => {},
    calcPrice: () => {},
};

export default React.memo(CartList)