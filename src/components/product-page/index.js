import React from "react";
import Layout from '../layout'
import BasketSimple from "../basket-simple";
import {cn as bem} from "@bem-react/classname";
import './style.css'

function ProductPage({callbacks, select}){
    const cn = bem('ItemPage')

    // console.log(select.product._id)

    return(
        <>{!!select.product
        ? <Layout head={<h1>{select.product.title}</h1>}>
            <BasketSimple callbacks={callbacks} sum={select.sum} amount={select.amount}/>
            <div className={cn()}>
            <div className={cn('char')}>{`${select.product.description}`}</div>
            <div className={cn('char')}>
                Старана производитель:&nbsp;
                <div className={cn('prop')}>
                        {`${select.product.maidIn.title} (${select.product.maidIn.code})`}
                </div>
            </div>
            <div className={cn('char')}>Категория:&nbsp;
                <div className={cn('prop')}>
                    {select.product.category.title}
                </div>
            </div>
            <div className={cn('char')}>
                Год выпуска:&nbsp;
                <div className={cn('prop')}>
                    {select.product.edition}
                </div>
            </div>
            <div className={cn('char')}>
                <div className={cn('prop')}>
                    Цена:&nbsp; {select.product.price}
                </div>
            </div>
            <button onClick={() => callbacks.addToBasket(select.id)}>Добавить</button>
            </div>
        </Layout>
        : <div className='Loader'><h1>↻ Загрузка...</h1></div>
        }
        </>
    )
}

export default React.memo(ProductPage)