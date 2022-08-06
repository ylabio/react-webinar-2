import React from 'react'
import Layout from '../layout/Layout'

const ModalWindow = ({products}) => {
    return (
        <div>
            <div>
                <div>
                    <Layout head={<h1>Корзина</h1>} />
                    <div>
                        {products.map(product => <div>product.price </div> )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ModalWindow)