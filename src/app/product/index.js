import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useState, useCallback, useEffect} from "react";
import ProductInfo from "../../components/product-info";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import axios from 'axios';

function Product(props) {

    const store = useStore();

    useEffect(() => {
        store.get('catalog').load();
    }, [])

    const select = useSelector(state => ({
        items: state.catalog.items,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const [productInfo, setProductInfo] = useState({
        description: '',
        name: '',
        category: '',
        edition: null,
        price: null,
    })

    useEffect(() => {
        const apiUrl = `http://example.front.ylab.io/api/v1/articles?search%5Bids%5D=${props.idProduct}`;
        axios.get(apiUrl).then((resp) => resp.data)
            .then((data) => {
                const item = data.result.items[0];
                setProductInfo(item);
            })
    }, [props.idProduct]);

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    return (
        <Layout head={<h1>{props.lang.header}</h1>} changeLang={props.changeLang} setChangeLang={props.setChangeLang}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} lang={props.lang}/>
            <ProductInfo onAdd={callbacks.addToBasket} item={productInfo} lang={props.lang}/>
        </Layout>
    )
}

export default React.memo(Product);
