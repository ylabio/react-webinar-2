import React, {useEffect, useState} from 'react'
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProductInfo(props) {
    const cn = bem('ProductInfo');

    return (
        <div className={cn()}>
            {props.children}
        </div>
    )
}

ProductInfo.defaultProps = {
    children: <></>
}

export default React.memo(ProductInfo);