import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Popup(props) {
    const cn = bem('Popup');
    return props.isOpened ? (
        <div className={cn('')}>
            <div className={cn('inner')}>
                <div className={cn('header')}>
                    <div><h2>Корзина</h2></div>
                    <div className={cn('header-btn')}><button onClick={() => props.setButtonPopup(false)}>Закрыть</button></div>
                </div>
                <div className={cn('content')}>

                </div>
            </div>
        </div>
    ) : ""
}

Popup.propTypes = {

}

Popup.defaultProps = {

}

export default React.memo(Popup);
