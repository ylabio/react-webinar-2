import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import BaseButton from "../base-button";

function Layout({children,head,setActivePopupCart,activePopupCart }){
    const cn = bem('Layout');

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                {head}
                {activePopupCart &&<BaseButton onClick={() => setActivePopupCart(false)}>Закрыть</BaseButton>}
            </div>
            <div className={cn('content')}>
                {children}
            </div>
        </div>
    )
}

Layout.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);