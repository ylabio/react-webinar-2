import React from "react";
import numberFormat from "../../utils/numberFormat";
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {withLocale} from "../../contexts/locale.context";

function SingleProductLayout({item, onAdd, lang}) {
    const cn = bem('Info');
    console.log(item._id);
    return(
        <div className={cn()}>
            <p className={cn("description")}>{item.description}</p>
            <p >Страна производитель: <b>{item.maidIn.title} ({item.maidIn.code})</b></p>
            <p>Категория: <b>{item.category.title}</b></p>
            <p>Год выпуска: <b>{item.edition}</b></p>
            <h2>Цена: {numberFormat(item.price)} ₽</h2>
            <button onClick={() => onAdd(item._id)}>{lang.handle('add')}</button>
        </div>
    )
}

export default React.memo(withLocale(SingleProductLayout));