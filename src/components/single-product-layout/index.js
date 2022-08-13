import React from "react";
import numberFormat from "../../utils/numberFormat";
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {withLocale} from "../../contexts/locale.context";
import propTypes from 'prop-types';

function SingleProductLayout({item, onAdd, lang}) {
    const cn = bem('Info');
    console.log(item._id);
    return(
        <div className={cn()}>
            <p className={cn("description")}>{item.description}</p>
            <p className={cn("country")}>Страна производитель: <b>{item.maidIn.title} ({item.maidIn.code})</b></p>
            <p className={cn("category")}>Категория: <b>{item.category.title}</b></p>
            <p className={cn("yers")}>Год выпуска: <b>{item.edition}</b></p>
            <h2 className={cn("price")}>Цена: {numberFormat(item.price)} ₽</h2>
            <button onClick={() => onAdd(item._id)}>{lang.handle('add')}</button>
        </div>
    )
}

SingleProductLayout.propTypes = {
    item: propTypes.object.isRequired,
    onAdd: propTypes.func.isRequired,
    lang: propTypes.object
}

export default React.memo(withLocale(SingleProductLayout));