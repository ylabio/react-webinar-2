import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Layout from '../layout';
import Controls from '../controls';
import List from '../list';
import plural from "plural-ru";

function Modal({active, setActive, productCart, onItemDeleteFromCart}) {
    const cn = bem('Modal');
    let sum = productCart.reduce((sum, item) => sum + item.amount * item.price, 0);

    return (
        <div className={active ? 'Modal active' : 'Modal'}>
            <div className={cn('content')} onClick={e => e.stopPropagation()}>
                <Layout head={<h1>Корзина</h1>} button={<button onClick={() => setActive(false)}>Закрыть</button>}>
                    <div className={cn('gap')}>dd</div>
                    <List items={productCart}
                          onItemDeleteFromCart={onItemDeleteFromCart}
                    />
                    {productCart.length ? (
                        <div className={cn('total')}>
                            Итого: <span> {`${sum} ₽`}</span>
                        </div>
                    ) : null}
                    <div className={cn('gap')}>dd</div>
                </Layout>
            </div>
        </div>
    );
}

export default React.memo(Modal);
