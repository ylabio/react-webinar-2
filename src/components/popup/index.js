import React from 'react';
import propTypes, {bool} from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PopupItem from "../popupItem";

function Popup(props) {
    const cn = bem('Popup');
    const cartTotal = props.cart.reduce((acc, item) => acc + (item.price * item.count), 0);
    return props.isOpened ? (
        <div className={cn('')}>
            <div className={cn('inner')}>
                <div className={cn('header')}>
                    <div><h2>Корзина</h2></div>
                    <div className={cn('header-btn')}><button onClick={() => props.setButtonPopup(false)}>Закрыть</button></div>
                </div>
                {props.cart.length > 0 ? <div className={cn('content')}>
                    {props.cart.map(item =>
                        <div key={item.code} className={cn('content-item')}>
                            <PopupItem item={item}
                                       deleteFromCart={props.deleteFromCart}
                            />
                        </div>
                    )}
                </div> : <div className={cn('content-empty')}><h2>Корзина пуста</h2></div>}
                <div className={cn('footer')}>
                    <p><b>Итого</b> <b className={cn('footer-price')}>{cartTotal.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumSignificantDigits: 20 })} </b></p>
                </div>
            </div>
        </div>
    ) : ""
}

Popup.propTypes = {
    isOpened: bool.isRequired,
    cart: propTypes.arrayOf(propTypes.object).isRequired,
    deleteFromCart: propTypes.func.isRequired,
}

Popup.defaultProps = {
    isOpened: false,
    cart: [],
    deleteFromCart: () => {},
}

export default React.memo(Popup);
