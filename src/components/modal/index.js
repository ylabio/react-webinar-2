import React from 'react';
import {cn as bem} from "@bem-react/classname";
import { formatPrice } from '../../utils';
import propTypes from 'prop-types';
import './style.css';
import ChosenItem from '../chosenItem';

function Modal(props) {
   
    const cn = bem('Modal');

    return (
        <>
            {
                props.toggle
                ?  <div className={cn()} >
                        <div className={cn('wrapper')}>
                            <div className={cn('head')}>
                                <h1>Корзина</h1>
                                <button
                                onClick={props.onToggle}
                                >Закрыть</button>
                            </div>
                            <div>
                                {
                                    props.chosenItems.map(item => {
                                        return <ChosenItem
                                                    key={item.title}
                                                    item={item}
                                                    onDelete={props.onDelete}
                                                    onToggle={props.onToggle}
                                                />
                                    })
                                }
                            </div>
                            <div className={cn('sum')}>
                                <span>Итого</span>
                                <span>{formatPrice(props.sum)}</span>
                            </div>
                        </div>
                    </div>
                : null
            }
        </>
              
    )
}

Modal.propTypes = {
    toggle: propTypes.bool.isRequired,
    chosenItems: propTypes.arrayOf(propTypes.object).isRequired,
    onToggle: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired,
    sum: propTypes.number.isRequired,
}

Modal.defaultProps = {
    propTypes: [],
    chosenItems: [],
    sum: 0,
    toggle: false,
    onToggle: () => {},
    onDelete: () => {},
}
export default React.memo(Modal) ;
