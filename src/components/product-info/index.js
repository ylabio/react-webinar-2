import React, {useEffect, useState} from 'react'
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProductInfo({select}) {
    const cn = bem('ProductInfo');

    return (
        <div className={cn()}>
            <p>{select.desc}</p>
            <p>Страна производитель: <b>{select.maidIn}</b></p>
            <p>Категория: <b>{select.category}</b></p>
            <p>Год выпуска: <b>{select.date}</b></p>
            <h3>Цена: {Number(select.price).toLocaleString()} ₽</h3>
            <button onClick={()=>{callbacks.addToBasket(id)}}>Добавить</button>
        </div>
    )
}

ProductInfo.defaultProps = {
    select:[]
}

export default React.memo(ProductInfo);