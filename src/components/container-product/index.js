import React, { useCallback } from "react";
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';

import useStore from "../../utils/use-store";
import "./style.css";

function ContainerProduct(props) {

    const store = useStore();

    const callbacks = {
        addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
    }

    const { language, selectItem } = props
    console.log(selectItem);



    return (<div className="container-product">
        <p className="description">{selectItem.description}</p>
        <p className="country">{language.productCountry}:{'\u00A0'} <strong>{selectItem.maidIn.title}</strong></p>
        <p className="category">{language.category}:{'\u00A0'}<strong>{selectItem.category.title} </strong> </p>
        <p className="year">{language.yearOfIssue}:{'\u00A0'}<strong>{selectItem.edition}</strong></p>
        <p className="price"><strong>{language.price}:{'\u00A0'}{numberFormat(selectItem.price) + " ₽"}</strong></p>
        <button onClick={() => callbacks.addToBasket(selectItem._id)}>{language.add}</button>
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