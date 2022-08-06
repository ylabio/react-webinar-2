import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import plural from 'plural-ru';
import Modal from '../modal'

function Controls(props) {
    const cn = bem('Controls');
    let total = props.productCart.length;
    let sum = props.productCart.reduce((sum, item) => sum + item.amount * item.price, 0);
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className={cn()}>
            <div className={cn('info')}>
                В корзине: <span>{total ? `${total} ${plural(total, 'товар', 'товара', 'товаров')} / ${sum} ₽` : 'пусто'}</span>
            </div>
            <button onClick={() => {
                setModalActive(true)
            }}>Перейти
            </button>
            <Modal active={modalActive}
                   setActive={setModalActive}
                   productCart={props.productCart}
                   onItemDeleteFromCart={props.onItemDeleteFromCart}

            />
        </div>
    )
}

Controls.propTypes = {
    productCart: propTypes.arrayOf(propTypes.object).isRequired,
    onItemDeleteFromCart: propTypes.func
}

Controls.defaultProps = {
    productCart: [],
    onItemDeleteFromCart: () => {
    },
}

export default React.memo(Controls);
