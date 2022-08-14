import React, { useContext} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import BaseButton from "../base-button";
import {AddItemContext, DeleteCartItemContext} from "../../app";
import {divideOnDigits} from "../../utils";


function Item(props) {
    const onAddItemToCart = useContext(AddItemContext)
    const onDeleteItem = useContext(DeleteCartItemContext)
    const cn = bem('Item');

    const handleOnClick = () => {
        onAddItemToCart(props.item)
        if (props.buttonName === 'Удалить') {
            onDeleteItem(props.item)
        }
    }

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
                <div className={cn('info')}>
                    <div className={('price')}>{divideOnDigits(props.item.price)}</div>
                    {props.item.count ? <div className={('code-cart')}>{props.item.count}{' '}{props.countProductCart}</div>
                        : '' }
                    <div><BaseButton onClick={handleOnClick}>{props.buttonName}</BaseButton></div>
                </div>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    countProductCart:propTypes.string.isRequired,
    buttonName:propTypes.string.isRequired

}

Item.defaultProps = {
    item: {},
    countProductCart: '',
    buttonName: '',
}

export default React.memo(Item);