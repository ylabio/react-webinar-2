import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ProductData from "../../components/product-data";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import { useParams } from 'react-router-dom'

function ProductCard() {

    let { id } = useParams();
    const store = useStore();

    useEffect(() => {
      store.get('catalogCard').load(id);
    }, [id])


    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
        item: state.catalogCard.item,
        itemCountry: state.catalogCard.itemCountry,
        itemCategory: state.catalogCard.itemCategory,
    }));

    const callbacks = {
        // Открытие корзины
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        // Добавление в корзину
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    };

    return (
        <Layout head={<h1>{select.item.title}</h1>}>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            { select.item && select.itemCountry && (
              <ProductData
                  item={select.item}
                  itemCountry={select.itemCountry}
                  itemCategory={select.itemCategory}
                  onAdd={callbacks.addToBasket}
                />
            )}
        </Layout>
    )
}

export default React.memo(ProductCard);

