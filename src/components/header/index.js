import Controls from "../controls";
import React, {useCallback, useEffect, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';


export const Header = ({list, openModal, getPrice, getCount}) => {

    const [count, setCount] = useState(0);

    const callbacks = {
        onChange: useCallback(() => {
           setCount(getPrice());
        }, [list])
    };

    useEffect(() => {
        callbacks.onChange();
    }, [list])

    useEffect(() => {
        console.log(count);
    }, [count]);

    const cn = bem('Header');
    return(
        <header className={cn()}>
            <p className={cn('cart')}>
                В корзине
            </p>

            {count !== 0 ?
                <p>
                    {count} / {getCount}
                </p> : <p>
                    Корзина пуста
                </p>

            }
            <Controls title='Перейти' onAdd={() => openModal()}/>
        </header>
    )
}