import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
    const cn = bem('List');
    return (
        <div className={cn()}>
            {props.items && (props.items.map(item =>
                <div key={item.code} className={cn('item')}>
                    <Item key={item.id} item={item}
                          cartItems={props.cartItems}
                          buttonName={props.buttonName}
                          countProductCart={props.countProductCart}
                    />
                </div>))}
        </div>

    )
}

List.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    cartItems: propTypes.arrayOf(propTypes.object).isRequired,
    buttonName: propTypes.string.isRequired
}

List.defaultProps = {
    items: [],
    cartItems:[],
    buttonName:'',
}

export default React.memo(List);