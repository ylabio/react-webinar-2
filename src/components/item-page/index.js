import React from "react";
import useLoadItem from '../../utils/use-loadItem';
import Layout from '../layout'
import BasketSimple from "../basket-simple";
import {cn as bem} from "@bem-react/classname";
import './style.css'

function ItemPage({callbacks, select}){
    const cn = bem('ItemPage');
    const {data, id} = useLoadItem();

    return(
        <>{!!data
        ? <Layout head={<h1>{data.name}</h1>}>
            <BasketSimple callbacks={callbacks} sum={select.sum} amount={select.amount}/>
            <div className={cn()}>
            <div className={cn('char')}>{`${data.description}`}</div>
            <div className={cn('char')}>
                Старана производитель:&nbsp;
                <div className={cn('prop')}>
                        {`${data.maidIn.title} (${data.maidIn.code})`}
                </div>
            </div>
            <div className={cn('char')}>Категория:&nbsp;
                <div className={cn('prop')}>
                    {data.category.title}
                </div>
            </div>
            <div className={cn('char')}>
                Год выпуска:&nbsp;
                <div className={cn('prop')}>
                    {data.edition}
                </div>
            </div>
            <div className={cn('char')}>
                <div className={cn('prop')}>
                    Цена:&nbsp; {data.price}
                </div>
            </div>
            <button onClick={()=>callbacks.addToBasket(id)}>Добавить</button>
            </div>
        </Layout>
        : <h1>Загрузка</h1>
        }
        </>
    )
}

export default React.memo(ItemPage)