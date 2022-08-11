import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Popup({head, children, onBasketPopupClose}) {
    const cn = bem('Popup');

    return (
        <div className={cn('wrapper')}>
            <div className={cn()}>
                <div className={cn('header')}>
                    {head}
                    <button onClick={onBasketPopupClose}>
                        Закрыть
                    </button>
                </div>
                {children}
            </div>
        </div>

    )
}

Popup.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
    onBasketPopupClose: propTypes.func.isRequired,
}

export default React.memo(Popup);
