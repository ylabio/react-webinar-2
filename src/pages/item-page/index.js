import {useParams} from "react-router";
import React, {useCallback, useEffect, useState} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {getCategoryById, getCountryById, getItemById} from "../../api/api";
import Controls from "../../components/controls";
import propTypes from "prop-types";
import useStore from "../../utils/use-store";

export const ItemPage = () => {
    let params = useParams();
    const cn = bem('ItemPage');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const store = useStore();

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(params.id), []),
    };


    const getInfo = async () => {
        getItemById(params.id).then(async (r) => {
            setData(r.data.result);
            const result = await getCountryById(r.data.result.maidIn._id);
            const category = await getCategoryById(r.data.result.category._id);
            if (category !== true) {
                setData(data => ({
                    ...data,
                    ...{
                        category: category.title
                    }
                }))
            }

            if (result === true) {
                setData(data => ({
                    ...data,
                    ...{
                        country: 'Нет информации',
                        countryCode: ''
                    }
                }));
                setIsLoading(false);
            } else {
                setData(data => ({
                    ...data,
                    ...{
                        country: result.title,
                        countryCode: result.code
                    }
                }));
                setIsLoading(false);
            }
        }).catch(() => {
            setError(true);
        })
    }

    useEffect(() => {
        getInfo();
    }, [])

    if (isLoading) {
        return <p className={cn('wrapper')}>Загрузка</p>
    }

    if (error) {
        return <p>Товар не найден</p>
    }

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
                Цена: {data.price}
            </div>
            <div className={cn('button-wrapper')}>
                <Controls onAdd={callbacks.addToBasket}/>
            </div>
        </div>
    )
}