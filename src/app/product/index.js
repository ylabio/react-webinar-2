import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { useLocation, Link } from "react-router-dom";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import ContainerProduct from "../../components/container-product";
import "./style.css"





function Product(props) {

    const store = useStore();
    const productId = useLocation().state;


    useEffect(() => {
        store.get('catalog').loadProduct(productId);
    }, [])

    const { language, selectItem, amount, sum } = useSelector(state => ({
        selectItem: state.catalog.selectItem,
        amount: state.basket.amount,
        sum: state.basket.sum,
        language: state.multilang.CurrentLang
    }));


    console.log(language);

    return (
        <Layout head={<h1>{language.productTitle}</h1>}>
            <Link className="Main" to="/">
                {language.productLink}
            </Link>
            <ContainerProduct language={language} sum={sum} amount={amount} selectItem={selectItem} />

        </Layout>

    )
}


export default React.memo(Product);