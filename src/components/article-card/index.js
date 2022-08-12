import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function ArticleCard(props){
    const cn = bem('ArticleCard')
    return (
        <div className={cn()}>
            <div className={cn('Description')}>{props.article.description}</div>
            <div className={cn('Prop')}>
                <div className={cn('Label')}>Страна производитель:</div>
                <span className={cn('Value')}>{props.article.maidIn?.title} ({props.article.maidIn?.code})</span>
            </div>

            <div className={cn('Prop')}>
                <div className={cn('Label')}>Категория:</div>
                <span className={cn('Value')}>{props.article.category?.title}</span>
            </div>

            <div className={cn('Prop')}>
                <div className={cn('Label')}>Год выпуска:</div>
                <span className={cn('Value')}>{props.article.edition}</span>
            </div>

            <div className={cn('Prop', {size: 'big'})}>
                <div className={cn('Label', {font: 'bold'})}>Цена:</div>
                <span className={cn('Value')}>{numberFormat(props.article.price)} ₽</span>
            </div>

            <button onClick={() => props.onAdd(props.article._id)}>Добавить</button>

        </div>

    )
}
ArticleCard.propTypes = {
    article: propTypes.object,
    onAdd: propTypes.func
}
ArticleCard.defaultProps = {

}

export default React.memo(ArticleCard)