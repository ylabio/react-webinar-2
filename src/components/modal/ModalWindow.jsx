import React, { useMemo, useState } from 'react'
import CartList from '../cart/cartList/CartList'
import ModalHead from './ModalHead'
import './style.css'
import propTypes from 'prop-types';

const ModalWindow = ({ onDeleteProduct, setModalStatus, modalStatus, products }) => {
    const [totalPrice, setTotalPrice] = useState(0)

    useMemo(() => {
        if (products.length !== 0) {
            setTotalPrice(products.map(item => item.price * item.value).reduce((item, total) => total += item, 0))
        }
    }, [products, totalPrice])

    let rootClasses = ['Modal']

    if (modalStatus) {
        rootClasses.push('active');
    }

    return (
        <div className={rootClasses.join(' ')} onClick={setModalStatus}>
            <div className='Modal-content' onClick={e => e.stopPropagation()}>
                <ModalHead setModalStatus={setModalStatus} />
                <CartList products={products} onDeleteProduct={onDeleteProduct} />
                <div className='Cart-totalprice'>
                    <strong className='Totalprice-title'>Итого: </strong><strong className='Totalprice-value'>{totalPrice} ₽</strong>
                </div>
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