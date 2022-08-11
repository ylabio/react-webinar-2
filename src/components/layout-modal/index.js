import React from 'react'
import propTypes from 'prop-types'
import 'style.css'
function LayoutModal({ head, active, setActive, children }) {
    return (
        <div>
            <div className={active ? 'Basket_modal active' : 'Basket_modal'}>
                <div className='Basket_modal_content'>
                    <div className='Basket_modal_menu'>
                        {head}
                        <div className='Basket_modal_bth'>
                            <button onClickCapture={() => setActive(false)}>Закрыть</button>
                        </div>
                    </div>
                    {children}
                </div>
            </div>


        </div>
    )
}
LayoutModal.propTypes = {
    head: propTypes.node.isRequired,
    active: propTypes.bool.isRequired,
    children: propTypes.node.isRequired,
    setActive: propTypes.func
}
LayoutModal.defaultProps = {
    setActive: () => { }
}
export default LayoutModal