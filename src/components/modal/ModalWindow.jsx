import React from 'react'
import Item from '../item/Item'
import Layout from '../layout/Layout'
import ModalHead from './ModalHead'
import './style.css'

const ModalWindow = ({ setModalStatus, modalStatus, products }) => {
    let rootClasses = ['Modal']
    if (modalStatus) {
        rootClasses.push('active');
    }

    return (
        <div className={rootClasses.join(' ')} onClick={setModalStatus}>
            <div className='Modal-content'>
                <Layout head={<ModalHead />} />
                <div>
                    {products.map((product, index) => <Item key={index} item={product} />)}
                </div>
            </div>
        </div>
    )
}

export default ModalWindow