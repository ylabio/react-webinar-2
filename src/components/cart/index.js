import React, {useEffect, useState, useCallback} from 'react';
import propTypes, { bool } from 'prop-types';
import Layout from '../layout';
import List from '../list';
import Controls from '../controls';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ShopCart({show, setShow, state, store}){
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
            <button className={cn('button')} onClick={()=>setShow(!show)}>
                Закрыть
            </button>
          </>
            } layout='Cartlayout'>
          <List items={state.shoppingCart} onDelete={callbacks.onDelete} />
        </Layout>
       {(state.shoppingCart.length > 0) && <div className={cn('footer')}>
          <span>Итого</span>
          <span className={cn('total')}>{state.shoppingCart.map(el => el.price * el.qty)
          .reduce((prev, curr)=> prev + curr,0)
          .toLocaleString('ru-RU') + ' \u20bd'}</span>
      </div>}
      </div>
    </div>
);
}

ShopCart.propTypes = {
    state: propTypes.object.isRequired,
    setShow: propTypes.func.isRequired,
    show: propTypes.bool
}
ShopCart.defaultProps = {
    state: {},
    store: {},
    show: bool,
    setShow: ()=>{},
}

export default React.memo(ShopCart);