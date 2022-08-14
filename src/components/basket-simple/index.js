import React from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import numberFormat from "../../utils/number-format";
import './styles.css';


function BasketSimple({sum, amount, onOpen, lang}) {
    const cn = bem('BasketSimple');
    return (
        <div className={cn()}>
            <Link to="/">{lang.link}</Link>
            <div>
                <span className={cn('label')}>{lang.label}:</span>
                <span className={cn('total')}>
                    {amount
                        ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽`
                        : `${lang.total}`
                    }
                </span>
                <button className='BasketSimple__button' onClick={onOpen}>{lang.button.move}</button>
            </div>
        </div>
    )
}

BasketSimple.propTypes = {
    lang: propTypes.object.isRequired,
    onOpen: propTypes.func.isRequired,
    sum: propTypes.number,
    amount: propTypes.number,
}

BasketSimple.defaultProps = {
    onOpen: () => {
    },
    sum: 0,
    amount: 0
}

export default React.memo(BasketSimple);
