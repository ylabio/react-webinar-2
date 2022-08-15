import React, { useCallback, useEffect, useState } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import { useParams } from "react-router-dom";
import './styles.css';
import useStore from '../../utils/use-store';
import { GridLoader } from "react-spinners";


export const ProfileProduct = () => {

    const store = useStore();
    const { id } = useParams()
    const [page, setPage] = useState(false)
    const cn = bem('ProfileProduct');

    async function load(id) {
        return await (fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
            .then(result => result.json())
            .then(res => res.result)
            .then(setPage))
            .catch(console.error)
    }

    useEffect(() => {
        load(id)
    }, [])

    const callbacks = {
        // Добавление в корзину
        onAdd: useCallback(id => store.get('basket').addToBasket(id), []),
    };

    return (
        <>
            {page ? (
                <div className={cn()}>

                    <div className={cn('description')}>
                        {page.description}
                    </div>
                    <div className={cn('maidIn')}>
                        Страна производитель: <strong>{page.maidIn.title} {`(${page.maidIn.code})`}</strong>
                    </div>
                    <div className={cn('category')}>
                        Категория: <strong> {page.category.title} </strong>
                    </div>
                    <div className={cn('edition')}>
                        Год выпуска: <strong> {page.edition} </strong>
                    </div>
                    <div className={cn('price')}>
                        Цена: {page.price} ₽
                    </div>
                    <button
                        className={cn('btn')}
                        onClick={() => callbacks.onAdd(id)}
                    >Добавить</button>
                </div>)
                : (
                    <div className={cn()}>
                        <strong>Loading...</strong>
                        <GridLoader />
                    </div>
                )}
        </>
    )
}

