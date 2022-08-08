import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import List from '../list';
import './style.css';


function Card({ socket,setModal, deleteLogic }) {
    


    const sum = socket?.reduce((acc, item) => {
        return acc + item?.amount * item?.price
    }, 0);

    const cn = bem('Card');

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <h1 className={cn('title')}>Корзина</h1>
                <div>
                    <button onClick={() => setModal(false)}>Закрыть</button>
                </div>
            </div>
            <div className={cn('list')}>
                <List
                    items={socket}
                    deleteLogic={deleteLogic}
                    cardItem
                    sum={sum}
                />
            </div>
        </div>
    )
}

Card.propTypes = {
    socket: propTypes.arrayOf(propTypes.object),
    onClose: propTypes.func.isRequired,
    deleteLogic: propTypes.func.isRequired
}

Card.defaultProps = {
    socket: [],
    deleteLogic: () => { }
}

export default React.memo(Card);