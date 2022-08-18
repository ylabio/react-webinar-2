import React from 'react';
import Controls from "../controls";
import propTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";

const PageContent = ({data, addToBasket}) => {
    const cn = bem('ItemPage');
    console.log(data);
    return (
        <div className={cn()}>
            <p>
                {data.description}
            </p>
            <p className={cn('item')}>
                Страна производитель: <b>{data.country} ({data.countryCode})</b>
            </p>
            <p className={cn('item')}>
                Категория: <b>{data.category}</b>
            </p>
            <p className={cn('item')}>
                Год выпуска: <b>{data.edition}</b>
            </p>
            <div className={cn('price')}>
                Цена: {data.price} ₽
            </div>
            <div className={cn('button-wrapper')}>
                <Controls onAdd={addToBasket}/>
            </div>
        </div>
    );
};

PageContent.propTypes = {
    data: propTypes.object.isRequired,
    addToBasket: propTypes.func.isRequired
}


export default React.memo(PageContent);