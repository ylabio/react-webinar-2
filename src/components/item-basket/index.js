import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";
import useStore from "../../utils/use-store";
import {useNavigate} from "react-router";

function ItemBasket(props) {
    const cn = bem('ItemBasket');
    const store = useStore();
    const navigate = useNavigate();

    const onHandle = () => {
        store.get('modals').close();
        navigate(`/articles/${props.item._id}`);
    }



    const callbacks = {
        onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove, props.item]),
        closeModal: useCallback(() => onHandle(), [])
    };

    return (
        <div className={cn()}>
            {/*<div className={cn('id')}>{props.item._id}</div>*/}
            <p onClick={callbacks.closeModal} className={cn('title')}>
                {props.item.title}
            </p>
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
