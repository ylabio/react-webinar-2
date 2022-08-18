import React, { useCallback } from "react";
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ItemCard(props) {
    const cn = bem('Item-card');
    const { item: { description, price, maidIn, category, edition }, onAdd } = props

    return (
        <div className={cn()}>
            <p>{description}</p>
            <p>Страна производитель: <span className={cn('country_styled')}>{maidIn.title} ({maidIn.code})</span></p>
            <p>Категория: <span className={cn('category_styled')}>{category.title}</span></p>
            <p>Год выпуска: <span className={cn('edition_styled')}>{edition}</span></p>
            <p className={cn('price_styled')}>Цена: {numberFormat(price)} ₽</p>
            <button onClick={onAdd}>Добавить</button>
        </div>
    )
}

ItemCard.propTypes = {
    item: propTypes.shape({
        _id: propTypes.string,
        description: propTypes.string,
        price: propTypes.number,
        maidIn: propTypes.object,
        category: propTypes.object,
        edition: propTypes.number
    }),
    onAdd: propTypes.func.isRequired,
    
}
  
ItemCard.defaultProps = {
    item: {
        description: '',
        price: 0, 
        maidIn: { title: 'незивестно', code: 0 }, 
        category: { title: 'незивестно' }, 
        edition: 0,
    }
}

export default React.memo(ItemCard)