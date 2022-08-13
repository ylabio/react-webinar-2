import React, {useEffect} from 'react';
import numberFormat from '../../utils/number-format'
import {cn as bem} from "@bem-react/classname";
import './style.css'
import {useParams} from "react-router-dom";
import propTypes from "prop-types";

const ProductPage = ({onAdd, item, getItem}) => {
    const cn = bem('product-page');
    const {product} = useParams()
    useEffect(()=>{
       getItem(product)
    }, [])
    return (
        <div className={cn()}>
            <p>{item.description}</p>
            <p>Страна производитель: <span>{item.maidIn && item.maidIn.title}  ({item.maidIn && item.maidIn.code})</span></p>
            <p>Категория: <span>{item.category && item.category.title}</span></p>
            <p>Год Выпуска: <span>{item.edition}</span></p>
            <p>Цена:  <span>{numberFormat(item.price)} ₽</span></p>
            <button onClick={()=>onAdd(item._id)}>Добавить</button>
        </div>
    );
};

ProductPage.propTypes = {
    item: propTypes.object,
    onAdd: propTypes.func,
    getItem: propTypes.func
}

ProductPage.defaultProps = {
    item: {},
    onAdd: ()=> {},
    currentPage: ()=> {}
}

export default ProductPage;