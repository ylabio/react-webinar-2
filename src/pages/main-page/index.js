import List from "../../components/list";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {Pagination} from "../../components/pagination";
import Loading from "../../components/loading";

function Main() {
    const store = useStore();

    const select = useSelector(state => ({
        amount: state.catalog.amount,
        items: state.catalog.items,
        isLoading: state.catalog.isLoading,
        currentPage: state.catalog.currentPage,
        skip: state.catalog.skip,
        limit: state.catalog.limit
    }));

    useEffect(() => {
        store.get('catalog').setIsLoading(true);
        store.get('catalog').setSkip((select.currentPage - 1) * select.limit);
        store.get('catalog').load().then(() => {
            store.get('catalog').setIsLoading(false);
        });

    }, [select.currentPage]);

    useEffect(() => {
        store.get('catalog').setLimit(10);
        store.get('catalog').setTitle('');
    }, [])


    const callbacks = {
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
        setCurrentPage: useCallback(currentIndex => store.get('catalog').setCurrentPage(currentIndex), [])
    };

    const renders = {
        item: useCallback(item => <Item item={item} link={`/articles/${item._id}`} onAdd={callbacks.addToBasket}/>, []),
    }

    if (select.isLoading) {
        return <Loading/>
    }

    return (
        <>
            <List items={select.items} renderItem={renders.item}/>
            <Pagination activeIndex={select.currentPage} setPage={callbacks.setCurrentPage} itemsPerPage={10}
                        totalItems={select.amount}/>
        </>
    )
}

export default Main;
