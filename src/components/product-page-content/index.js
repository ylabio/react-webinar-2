import React from 'react';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import propTypes from "prop-types";

const ProductPageContent = ({ item, onAdd}) => {
    const cn = bem('Product-page-content');
    return (
        <div>
            <div className={cn()}>
               <p>{item.description && item.description}</p>
               <p>Страна производитель: <span>{item.maidIn && item.maidIn.title}  ({item.maidIn && item.maidIn.code})</span></p>
               <p>Категория: <span>{item.category && item.category.title}</span></p>
               <p>Год Выпуска: <span>{item.edition}</span></p>
                <p>Цена:  <span>{numberFormat(item.price)} ₽</span></p>
                <button onClick={()=>onAdd(item._id)}>Добавить</button>
            </div>
        </div>
    );
};

ProductPageContent.propTypes = {
    item: propTypes.object,
    onAdd: propTypes.func,
}

ProductPageContent.defaultProps = {
    item: {},
    onAdd: () => {},
}

export default React.memo(ProductPageContent);