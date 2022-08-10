import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import propTypes from 'prop-types';
import Total from "../total";


function Cart(props){
    const cn = bem('Cart');

    function cartItems() {
        let resultArr=[];
        for (let key in props.items) {
            const cartItem = props.cart.find((i) => i.id === props.items[key].code);
            if(cartItem === undefined) {
                continue;
            }
            resultArr.push({...cartItem,...props.items[key]});
        }
        return resultArr;

    }


    return (
        <div className={cn('')}>
            <div className={cn('container')}>
                <List  items={cartItems()} onItemDelete={props.onItemDelete} />
                <Total amount={props.amount} lengthCart={props.lengthCart}/>
            </div>
        </div>
    )
}

Cart.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
    items: propTypes.arrayOf(propTypes.object).isRequired,
    lengthCart:propTypes.number.isRequired,
    amount:propTypes.number.isRequired,
    onItemDelete:propTypes.func.isRequired,
    openedModal:propTypes.bool,
};

Cart.defaultProps = {

};

export default React.memo(Cart);