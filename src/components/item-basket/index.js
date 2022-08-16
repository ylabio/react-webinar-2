import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {useNavigate} from "react-router-dom";
import useStore from "../../utils/use-store"

function ItemBasket(props) {

    const cn = bem('ItemBasket');
    const navigate = useNavigate();
    const store = useStore();

    const callbacks = {
        closeModal: useCallback(() => store.get('modals').close(), []),
        onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item])
    };

    function goto(id) {
        navigate("/product/" + id);
    }

    return (
        <div className={cn()}>
            {/*<div className={cn('id')}>{props.item._id}</div>*/}
            <div className={cn('title')}
                 onClick={() => {
                     goto(props.item._id)
                     callbacks.closeModal()
                 }}>{props.item.title}</div>
            <div className={cn('right')}>
                <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
                <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
                <div className={cn('cell')}>
                    <button onClick={callbacks.onRemove}>Удалить</button>
                </div>
            </div>
        </div>
    )
}

ItemBasket.propTypes = {
    item: propTypes.object.isRequired,
    onRemove: propTypes.func,
}

ItemBasket.defaultProps = {}

export default React.memo(ItemBasket);
