import React, { useEffect, useCallback } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat'
import './style.css';
import useStore from '../../utils/use-store';



function Article(props) {
    const cn = bem('Article');

    console.log('Article');

    const item = props.item

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    };
    const store = useStore();


    useEffect(() => {
        store.get('article').loadItem(store.state.article._id)
    }, [])


    return (
        <div className={cn()}>
            <p className={cn('info')}> {item.description}</p>
            <p className={cn('info')}> Страна производитель: <span>{item.maidIn && item.maidIn.title}</span></p>
            <p className={cn('info')}> Категория: <span>{item.category && item.category.title}</span></p>
            <p className={cn('info')}> Год выпуска: <span>{item.edition}</span></p>
            <p> <span className={cn('price')}>Цена: {numberFormat(item.price)} ₽</span> </p>
            <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )

}

Article.propTypes = {
    onAdd: propTypes.func,
    items: propTypes.arrayOf(propTypes.object).isRequired,
}
Article.defaultProps = {
    items: [],
    onAdd: () => { }
}

export default React.memo(Article);
