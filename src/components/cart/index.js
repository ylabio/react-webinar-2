import React, {useEffect, useState, useCallback} from 'react';
import propTypes from 'prop-types';
import Layout from '../layout';
import List from '../list';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ShopCart({show, setShow, store}){
    const cn = bem('Cart');

    const callbacks = {
        onDelete: useCallback((code) => {
          store.deleteCartItem(code);
        }, []),
      }
return (
    
<div className={cn()} onClick={()=>setShow(false)}>
    <div className={cn('content')} onClick={(e)=>e.stopPropagation()}>
    <Layout head={
    <>
        <h1>Корзина</h1>
        <button className={cn('button')} onClick={()=>setShow(false)}>Закрыть</button>
    </>
    } layout='Cartlayout'>
        <List items={store.getState().shoppingCart} onItemAdd={null}
        onDelete={callbacks.onDelete}
        />
    </Layout>
    </div>
</div>

);
}

ShopCart.propTypes = {
    cart: propTypes.array.isRequired,
    onButtonClick: propTypes.func.isRequired
}
ShopCart.defaultProps = {
    cart: [],
    onButtonClick: ()=>{},
}

export default React.memo(ShopCart);