import React from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css"
import useStore from "../../utils/use-store";


function ProductContent({productInfo}){

    const cn = bem('ProductContent');

    const store = useStore();

    return (
        <div className={cn()}>
            <span className={cn('main-description')}>{productInfo.description}</span>
            <div className={cn("category")}>
              <span className={cn('title')}>Страна производитель:</span>
              <span className={cn("description")}>{productInfo.maidIn.title}</span>
            </div>
            <div className={cn("category")}>
              <span className={cn('title')}>Категория:</span>
              <span className={cn("description")}>{productInfo.category.title}</span>
            </div>
            <div className={cn("category")}>
              <span className={cn('title')}>Год выпуска:</span>
              <span className={cn("description")}>{productInfo.edition}</span>
            </div>
            <div className={cn("price-container")}>
            <span className={cn('price')}>{'Цена:   ' + String(productInfo.price).replace(/\./g,',') + ' ₽'}</span>
            <button onClick={() => {store.get('basket').addProductToBasket(productInfo)}}>Добавить</button>
            </div>
        </div>
    )
}


export default React.memo(ProductContent);