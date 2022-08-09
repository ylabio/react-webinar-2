import React, { useMemo, useState } from 'react'
import CartList from '../cart/cartList/CartList'
import ModalHead from './ModalHead'
import './style.css'
import propTypes from 'prop-types';
import Totalprice from './Totalprice';
import CartModalContent from './CartModalContent';

const ModalWindow = ({ onDeleteProduct, setModalStatus, modalStatus, products }) => {

    let rootClasses = ['Modal']

    if (modalStatus) {
        rootClasses.push('active');
    }

    return (
        <div className={rootClasses.join(' ')} onClick={setModalStatus}>
            <div className='Modal-content' onClick={e => e.stopPropagation()}>
                <CartModalContent setModalStatus={setModalStatus} products={products} onDeleteProduct={onDeleteProduct} />
            </div>
        </div>
    )
}

ModalWindow.propTypes = {
    setModalStatus: propTypes.func.isRequired,
    modalStatus: propTypes.bool.isRequired,
    products: propTypes.arrayOf(propTypes.object).isRequired
}

ModalWindow.defaultProps = {
    setModalStatus: () => { },
    modalStatus: false,
    products: []
}


export default React.memo(ModalWindow)