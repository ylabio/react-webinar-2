import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

import './style.css';


function Modal({ active, setActive, children, head = "Корзина", summationCart }) {
    const cn = bem('Modal');

    function divideNumberByPieces(x, delimiter) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
      }
      

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
                    > {` ${divideNumberByPieces(summationCart)} ₽`} </p>
                </div>

            </div>

        </div>
    )
}

export default React.memo(Modal)