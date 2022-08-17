import React from 'react';
import Controls from "../controls";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

const ItemActicle = ({article, onAdd }) => {
    const cn = bem('Article');
    return (
        <div className={cn()} >
            <div className={cn('description')}>
                {article.description}
            </div>
            <div>Страна производитель:<span> {article.maidIn?.title}</span></div>
            <div>Категория: <span>{article.category?.title}</span></div>
            <div>Год выпуска: <span>{article?.edition}</span> </div>
            <div className={cn('price')}> <span>Цена: {article.price} ₽</span></div>
            <div className={cn('controls')}>
                <Controls onAdd={onAdd}/>
            </div>
        </div>
    );
};


ItemActicle.propTypes = {
    article: propTypes.object.isRequired,
    onAdd: propTypes.func,
}

export default React.memo(ItemActicle);