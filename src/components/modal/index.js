import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Modal({active, setActive, totalPrice, basket, deleteItem, totalCount, item: Item}) {
    const cn = bem('Modal');
    return (
        <div className={active ? 'Modal active' : cn()} onClick={() => setActive(false)}>
            <div className={active ? cn('content active') : cn('content')} onClick={e => e.stopPropagation()}>
                <div className='head'><h1>Корзина</h1>
                    <button onClick={() => setActive(false)} className={cn('close')}>Закрыть</button>
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
    active: propTypes.bool,
    setActive: propTypes.func,
    totalPrice: propTypes.number,
    basket: propTypes.arrayOf(propTypes.object).isRequired
}

Modal.defaultProps = {
    deleteItem: () => {
    },
    setActive: () => {
    },
    active: false,
    totalPrice: null,
}

export default React.memo(Modal);
