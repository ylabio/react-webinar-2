import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import {useParams} from "react-router-dom";
import CatalogApi from "../../api/catalog";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Controls from "../../components/controls";
import ItemActicle from "../../components/item-article";

const ArticleById = () => {
    const store = useStore();
    const [article, setArticle] = useState({})
    const params = useParams()

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,

    }));

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    const fetchArticleById = async () => {
        const response = await CatalogApi.getArticleById(params.id)
        setArticle(response)
    }

    useEffect(() => {
        fetchArticleById()

    },[])

    return (
            <Layout head={<h1 style={{fontSize: '32px'}}>{article.title}</h1>} >
                <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
                <ItemActicle article={article} onAdd={() => callbacks.addToBasket(params.id)}/>
            </Layout>


    );
};

export default React.memo(ArticleById)