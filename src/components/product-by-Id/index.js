
import React, { useLayoutEffect, useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { cn as bem } from "@bem-react/classname";

import './styles.css';

export const ProductById = () => {

    const cn = bem('ProductById');

    const { id } = useParams()
    const context = useOutletContext()
    const _id = useRef()

    _id.current = id

    useLayoutEffect(() => {

        return context.setId(id)

    }, [_id.current])


    return (

        <>
            { (!!context.item.title) ?
            (
                <div className={cn()}>

                    <div className={cn('description')}>
                        {context.item.description}
                    </div>
                    <div className={cn('maidIn')}>
                        Страна производитель: 
                        <strong>{context.item.maidIn.title}
                            {`(${context.item.maidIn.code})`}
                        </strong>
                    </div>
                    <div className={cn('category')}>
                        Категория: <strong> {context.item.category.title} </strong>
                    </div>
                    <div className={cn('edition')}>
                        Год выпуска: <strong> {context.item.edition} </strong>
                    </div>
                    <div className={cn('price')}>
                        Цена: {context.item.price} ₽
                    </div>
                    <button
                        className={cn('btn')}
                        onClick={() => context.onAdd(id)}
                    >Добавить</button>
                </div>
            ): ''
        
        }
        </>
    )
}