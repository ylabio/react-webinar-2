import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Navigation from "../../components/navigation";
import HeaderWrapper from "../../components/header-wrapper";


function Main() {


    console.log('Main');


    const store = useStore();

    useEffect(() => {
        store.get('catalog').load();

    }, [store.get('catalog')])


    const select = useSelector(state => ({
        items: state.catalog.items,
        _id: state.item_page._id,
        currentItem: state.item_page.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
        count: state.catalog.count,
        currentPage: state.catalog.query.page
    }));


    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
        // Пагинация
        pagination: useCallback(({page}) => store.get('catalog').load({page}), []),
        // Выбор конкретного товара по id
        // getId: useCallback(_id => store.get('item_page').getId(_id), []),
        getItem: useCallback(_id => store.get('item_page').loadItem(_id), []),
    };

    const renders = {
        item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} getId={callbacks.getItem} link={`articles/${item._id}`}/>, []),
    }
    return (
        <Layout head={<h1>Магазин</h1>}>
            <HeaderWrapper>
                <Navigation/>
                <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            </HeaderWrapper>
                        <List items={select.items} renderItem={renders.item}/>
                        <Pagination currentPage={select.currentPage} count={select.count}
                                    pagination={callbacks.pagination}/>
        </Layout>
    )
}

export default React.memo(Main);
