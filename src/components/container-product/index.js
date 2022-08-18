import React, { useCallback } from "react";
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';

import "./style.css";

function ContainerProduct(props) {



    const { language, selectItem, add } = props




    return (<div className="container-product">
        <p className="description">{selectItem.description}</p>
        <p className="country">{language.productCountry}:{'\u00A0'} <strong>{selectItem.maidIn.title}</strong></p>
        <p className="category">{language.category}:{'\u00A0'}<strong>{selectItem.category.title} </strong> </p>
        <p className="year">{language.yearOfIssue}:{'\u00A0'}<strong>{selectItem.edition}</strong></p>
        <p className="price"><strong>{language.price}:{'\u00A0'}{numberFormat(selectItem.price) + " ₽"}</strong></p>
        <button onClick={() => add(selectItem._id)}>{language.add}</button>
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