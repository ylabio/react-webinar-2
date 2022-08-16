import React from "react";
import "./style.css"

import {cn as bem} from "@bem-react/classname";
const cn = bem('ItemInfo');

function ItemPage( { item, onAdd }) {

    return(
        <div className={cn()}>
            <p>{item.description}</p>
            <p>Страна производитель: <span className={cn("span")}>
                            {item.country}<span className={cn("span")}>({item.countryCode})</span>
                        </span></p>
            <p>Категория: <span className={cn("span")}>{item.category}</span></p>
            <p>Год выпуска: <span className={cn("span")}>{item.edition}</span></p>
            <span className={cn("price")}>Цена: <span className={cn("price")}>{item.price}</span></span>
            <button type="button" onClick={onAdd} className={cn("btn")}>Добавить</button>
        </div>
    )
}

export default React.memo(ItemPage)
