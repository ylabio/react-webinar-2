import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import React, {useState, useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(props) {

    console.log('Main');

    const store = useStore();

    useEffect(() => {
        store.get('catalog').load();
    }, [])

    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    const renders = {
        item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} setIdProduct={props.setIdProduct}
                                        lang={props.lang}/>, []),
    }

    // Вычисляем количество страниц
    const pageCount = Math.ceil((select.items.length) / 10);

    // Номер активной страницы
    const [activePage, setActivePage] = useState(1);

    // Выводим товар на страницу
    const showItems = select.items.slice([(activePage - 1) * 10], [activePage * 10]);

    return (
        <Layout head={<h1>{props.lang.header}</h1>} setChangeLang={props.setChangeLang} changeLang={props.changeLang}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={props.lang}/>
            <List items={showItems} renderItem={renders.item}/>
            <Pagination pageCount={pageCount} activePage={activePage} setActivePage={setActivePage}/>
        </Layout>
    )
}

export default React.memo(Main);
