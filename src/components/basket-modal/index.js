import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";


import Layout from "../layout";
import BasketList from "../basket-list";
import BasketSum from "../basket-sum";

import "./style.css";

function BasketModal({onVisibility, items, price, onDeleteItemToBasket}) {
    const cn = bem('BasketModal')
    return (
        <div className={cn('area')}>
            <div className={cn('window')}>
                <Layout head={
                    <div className={cn('header')}>
                        <h1>Корзина</h1>
                        <button className={cn('button')} onClick={() => onVisibility()}>Закрыть</button>
                    </div>
                } option='modal'>

                <BasketList 
                    items={items} 
                    onDeleteItemToBasket={onDeleteItemToBasket}
                    option='modal'/>
                    
                <BasketSum price={price}/>
                </Layout>
            </div>
        </div>
    )
}

BasketModal.propTypes = {
    onVisibility: propTypes.func.isRequired,
    items: propTypes.array.isRequired,
    price: propTypes.number,
    onDeleteItemToBasket: propTypes.func.isRequired
}

BasketModal.defaultProps = {
    onVisibility: () => {}
}
  

export default React.memo(BasketModal);