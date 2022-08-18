import React from "react";
import Layout from '../layout'
import BasketSimple from "../basket-simple";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import Header from "../header/header";
import ToHomePage from "../home";

function ProductPage({basketAmount, basketSum, product, currentId, onOpenModal, addToBasket}){
    const cn = bem('ItemPage');

    return(
        <>{!!product
        ? <Layout head={<h1>{product.title}</h1>}>
            <Header>
                <ToHomePage />
                <BasketSimple onOpenModal={onOpenModal} sum={basketSum} amount={basketAmount}/>
            </Header>
            <div className={cn()}>
            <div className={cn('char')}>{`${product.description}`}</div>
            <div className={cn('char')}>
                Старана производитель:&nbsp;
                <div className={cn('prop')}>
                        {`${product.maidIn.title} (${product.maidIn.code})`}
                </div>
            </div>
            <div className={cn('char')}>Категория:&nbsp;
                <div className={cn('prop')}>
                    {product.category.title}
                </div>
            </div>
            <div className={cn('char')}>
                Год выпуска:&nbsp;
                <div className={cn('prop')}>
                    {product.edition}
                </div>
            </div>
            <div className={cn('char')}>
                <div className={cn('prop')}>
                    Цена:&nbsp; {product.price}
                </div>
            </div>
            <button onClick={() => addToBasket(currentId)}>Добавить</button>
            </div>
        </Layout>
        : <div className='Loader'><h1>↻ Загрузка...</h1></div>
        }
        </>
    )
}

export default React.memo(ProductPage)