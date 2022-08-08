import React, {useCallback, useEffect, useState} from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import PropTypes from "prop-types";
import ModalList from "../modal-list";

export const CartModal = (props) => {
    const cn = bem('Modal');
    const [lastPrice, setLastPrice] = useState(0);
    const callback = useCallback(() => {
        let price = 0;

        props.items.map(i => {
            if (i === undefined) {
                return;
            }
            price += i.price * i.counter;
        })
        setLastPrice(price);
    }, [props.items])



    useEffect(() => {
        callback();
        console.log(props.items.length);
    }, [props.items]);

    return (
        <div className={cn()}>
            <header className={cn('header')}>
                <h2 className={cn('header-title')}>
                    {props.title}
                </h2>
                <button onClick={props.closeModal}>
                    Закрыть
                </button>
            </header>
            <div className={cn('list')}>
                <List type='modal' items={props.items}
                           onItemSelect={props.itemFunc}/>
            </div>

            <div className={cn('last-price')}>
                {props.items.length !== 0 ? (<>
                    <b className={cn('result')}>
                        Итого
                    </b>

                    <b className={cn('result')}>
                        {lastPrice} ₽
                    </b>
                </>) : <b>Корзина пуста</b>}
            </div>
        </div>
    )
}

CartModal.defaultProps = {
    closeModal: () => {
    },
    title: '',
    items: []
}

CartModal.propTypes = {
    title: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    items: PropTypes.array,
    itemFunc: PropTypes.func.isRequired
}