import {useParams} from "react-router";
import React, {useCallback, useEffect, useState} from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {getCategoryById, getCountryById, getItemById} from "../../api/api";
import Controls from "../../components/controls";
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
            let obj = r.data.result;
            const result = await getCountryById(r.data.result.maidIn._id);
            const category = await getCategoryById(r.data.result.category._id);
            if (category !== true) {
                obj = {
                    ...obj,
                    ...{
                        category: category.title
                    }
                }
            }
            if (result === true) {

                obj = {
                    ...obj,
                    ...{
                        country: 'Нет информации',
                        countryCode: ''
                    }
                }
                setIsLoading(false);
            } else {
                obj = {
                    ...obj,
                    ...{
                        country: result.title,
                        countryCode: result.code
                    }
                }
                setIsLoading(false);
            }

            setData(obj);
            console.log(obj);
        }).catch(() => {
            setError(true);
        })
    }

    useEffect(() => {
        getInfo();
    }, [params.id])

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
                Цена: {data.price} ₽
            </div>
            <div className={cn('button-wrapper')}>
                <Controls onAdd={callbacks.addToBasket}/>
            </div>
        </div>
    )
}