import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

import './style.css';


function Modal({ active, setActive, children, head = "Корзина", totalPricee = 232 }) {
    console.log(active)
    const cn = bem('Modal');
    return (
        <div className={active ? cn('active') : cn()}>
            <div className={cn("content")}>
                <div className={cn("head")}>
                    <h1>{head}</h1>


                    <button
                        className={cn('setActive')}
                        onClick={() => setActive(false)}
                    > Закрыть
                    </button>
                </div>

                {children}

                <div
                    className={cn('footer')}
                >
                    <p className={cn('total')}
                    > Итого </p>

                    <p className={cn('price')}
                    > {` ${totalPricee} ₽`} </p>
                </div>

            </div>

        </div>
    )
}

export default React.memo(Modal)