import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import {useParams} from "react-router-dom";
import CatalogApi from "../../api/catalog";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Controls from "../../components/controls";

const ArticleById = () => {
    const store = useStore();

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,

    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    const params = useParams()

    const [article, setArticle] = useState({})

    const fetchArticleById = async () => {
        const response = await CatalogApi.getArticleById(params.id)
        setArticle(response)
    }

    useEffect(() => {
        fetchArticleById()

    },[])


    return (
        <Layout head={<div>{article.title}</div>} >
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            <div>
                {article.description}
            </div>
            <div>{article.maidIn?.title}</div>
            <div>{article.category?.title}</div>
            <div>{article?.edition}</div>
            <div>Цена:  {article.price} ₽</div>
            <Controls onAdd={() => callbacks.addToBasket(params.id)}/>
        </Layout>
    );
};

export default React.memo(ArticleById)