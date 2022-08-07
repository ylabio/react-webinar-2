import React from 'react';
import {cn as bem} from "@bem-react/classname";
import List from "../list/index";
import { priceReduce } from '../../utils';
import './style.css';

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
                            <List   
                                items={props.chosenItems}
                                onItemDelete={props.onItemDelete}
                                onToggle={props.onToggle}
                            />
                            <div className={cn('sum')}>
                                <span>Итого</span>
                                <span>{priceReduce(props.chosenItems)} &#8381;</span>
                            </div>
                        </div>
                    </div>
                : null
            }
        </>
              
    )
}

export default React.memo(Modal) ;
