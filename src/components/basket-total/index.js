import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils/numbers";
import './styles.css'

function BasketTotal(props) {
    const cn = bem('BasketTotal');

    return (
        <div className={cn()}>
            {props.amount
                ? <span className={cn('title')}>{props.title}</span>
                : <span className={cn('void-title')}>В корзине пусто</span>}
            <span className={cn('total')}>
                        {props.amount ? `${numberFormat(props.price,)} ₽` : null}
                    </span>
        </div>
    )
}
BasketTotal.propTypes = {
    title: propTypes.string,
    price: propTypes.number,
    amount: propTypes.number,
};
BasketTotal.defaultProps = {
    title: '',
    amount: 0,
    price: 0,
};

export default React.memo(BasketTotal)