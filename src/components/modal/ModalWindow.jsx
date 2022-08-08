import React from 'react'
import CartList from '../cart/CartList'
import ModalHead from './ModalHead'
import './style.css'
import propTypes from 'prop-types';

const ModalWindow = ({ setModalStatus, modalStatus, products }) => {
    let rootClasses = ['Modal']
    if (modalStatus) {
        rootClasses.push('active');
    }

    return (
        <div className={rootClasses.join(' ')} onClick={setModalStatus}>
            <div className='Modal-content'>
                <ModalHead setModalStatus={setModalStatus} />
                <CartList products={products} />
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