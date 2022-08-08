import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Modal({modal, setModalActive, totalPrice, basket, deleteItem, totalCount, itemComponent: Item}) {
    const cn = bem('Modal');
    return (
        <div className={modal.active ? 'Modal active' : cn()} onClick={() => setModalActive(modal.id)}>
            <div className={modal.active ? cn('content active') : cn('content')} onClick={e => e.stopPropagation()}>
                <div className='head'><h1>Корзина</h1>
                    <button onClick={() => setModalActive(modal.id)} className={cn('close')}>Закрыть</button>
                </div>
                <div className=''>{basket.map(item =>
                    <div key={item.code} className={cn('item')}>
                        <Item item={item} deleteItem={deleteItem}/>
                    </div>
                )}
                </div>
                {totalCount
                    ? <div className='totalPrice'>Итого <span
                        className='totalPrice-count'>{totalPrice.toLocaleString()}</span>₽</div>
                    : <div className={cn('empty')}>Упс, корзина пустая!</div>
                }
            </div>
        </div>
    )
}

Modal.propTypes = {
    deleteItem: propTypes.func,
    modal: propTypes.object.isRequired,
    setModalActive: propTypes.func,
    totalPrice: propTypes.number,
    totalCount: propTypes.number,
    itemComponent: propTypes.object.isRequired,
    basket: propTypes.arrayOf(propTypes.object).isRequired
}

Modal.defaultProps = {
    deleteItem: () => {
    },
    setModalActive: () => {
    },
    totalPrice: null,
    totalCount: null
}

export default React.memo(Modal);
