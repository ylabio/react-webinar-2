import React, { useCallback } from "react";
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';
import BasketSimple from "../basket-simple";
import useStore from "../../utils/use-store";
import "./style.css";

function ContainerProduct(props) {

    const store = useStore();

    const callbacks = {
        openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
    }

    const { selectItem, amount, sum } = props



    return (<div className="container-product">
        <BasketSimple sum={sum} amount={amount} onOpen={callbacks.openModalBasket}></BasketSimple>
        <p className="description">{selectItem.description}</p>
        <p className="country">Страна производитель:{'\u00A0'} <strong>{selectItem.maidIn.title}</strong></p>
        <p className="category">Категория:{'\u00A0'}<strong>{selectItem.category.title} </strong> </p>
        <p className="year">Год выпуска:{'\u00A0'}<strong>{selectItem.edition}</strong></p>
        <p className="price"><strong>Цена:{'\u00A0'}{numberFormat(selectItem.price) + " ₽"}</strong></p>
        <button onClick={() => callbacks.addToBasket(selectItem._id)}>Добавить</button>
    </div>)
}


export default React.memo(ContainerProduct);



ContainerProduct.defaultProps = {
    selectItem: {
        description: "Заходи с главной",
        maidIn: { title: "" },
        category: { title: "" },
        edition: "",
        price: "",
        _id: null
    }

}