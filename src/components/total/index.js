import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {spaceInPrice} from "../../utils";
import propTypes from 'prop-types';


function Total(props){

    const cn = bem('Total');


    return (
        <div className={cn('')}>
            <div className={cn('container')}>
                {props.lengthCart
                    ?
                    <div className={cn('total')}>
                        Итого: <p className={cn('sum')}>{spaceInPrice(props.amount)} ₽</p>
                    </div>
                    :
                    <div className={cn('empty')}>
                        Корзина пуста
                    </div>
                }
            </div>
        </div>
    )
}

Total.propTypes = {
    lengthCart:propTypes.number.isRequired,
    amount:propTypes.number.isRequired,
};

Total.defaultProps = {

};

export default React.memo(Total);