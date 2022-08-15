import React from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css"
import useStore from "../../utils/use-store";


function ProductContent({productInfo}){

    const cn = bem('ProductContent');

    const store = useStore();

    return (
        <div className={cn()}>
            <p className={cn('title')}>{productInfo.description}</p>
            <div className={cn("category")}>
              <p className={cn('title')}>Страна производитель:</p>
              <p className={cn("description")}>{productInfo.maidIn.title}</p>
            </div>
            <div className={cn("category")}>
              <p className={cn('title')}>Категория:</p>
              <p className={cn("description")}>{productInfo.category.title}</p>
            </div>
            <div className={cn("category")}>
              <p className={cn('title')}>Год выпуска:</p>
              <p className={cn("description")}>{productInfo.edition}</p>
            </div>
              <p className={cn('price')}>{'Цена:   ' + String(productInfo.price).replace(/\./g,',') + ' ₽'}</p>
            <button onClick={() => {store.get('basket').addProductToBasket(productInfo)}}>Добавить</button>
        </div>
    )
}


export default React.memo(ProductContent);