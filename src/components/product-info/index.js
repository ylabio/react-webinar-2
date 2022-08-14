import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ProductInfo(props) {
    const cn = bem('ProductInfo');

    const callbacks = {
        onAdd: useCallback((e) => props.onAdd(props.item?._id), [props.onAdd, props.item])
    };

    return (
        <div className={cn()}>
            <div className={cn('text')}>
                {props.item?.description}
            </div>
            <div className={cn('text')}>
                {props.lang.info.code}: <b>{props.item?.name}</b>
            </div>
            <div className={cn('text')}>
                {props.lang.info.category}: <b>{props.item?.category._id}</b>
            </div>
            <div className={cn('text')}>
                {props.lang.info.year}: <b>{props.item?.edition}</b>
            </div>
            <div className={cn('price')}>
                <b>{props.lang.info.price}: {numberFormat(props.item?.price)} ₽</b>
            </div>
            <div className={cn('button')}>
                <button onClick={callbacks.onAdd}>{props.lang.button.add}</button>
            </div>
        </div>
    )
}

ProductInfo.propTypes = {
    item: propTypes.object.isRequired,
    lang: propTypes.object.isRequired,
    onAdd: propTypes.func,
}

ProductInfo.defaultProps = {
    onAdd: () => {
    },
}

export default React.memo(ProductInfo);
