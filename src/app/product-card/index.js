import React, {useCallback} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";

function ProductCard() {
    return (
        <Layout head={<h1>Название товара</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <p>Описание товара из множества букв. Описание товара из букв. В АПИ может быть меньше букв. Описание товара из множества букв.</p>
            <p>Страна производитель: <span>Россия (RU)</span></p>
            <p>Категория: Электронника123a</p>
            <p>Год выпуска: <span>2015</span></p>
            <p>Цена:  12,57 ₽</p>
            <button>Добавить</button>
        </Layout>
    )
}

export default React.memo(ProductCard);