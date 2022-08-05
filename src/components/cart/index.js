import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Cart(){
    const cn = bem('Cart');
  
    return (
      <div className={cn()}>
  
        <div className={cn('background')}/>
        <div className={cn('wrapper')}>
            <div className={cn('content')}>
                start
                dsdsd{/* { children } */}<br/>
                dfdf<br/>
                {/* dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>dfdfdfd<br/>
                finish */}

            </div>
        </div>
      
      </div>
    )
  }
  
  Cart.propTypes = {
    // onAdd: propTypes.func.isRequired, // Обяхательное свойство - функция
    // cart: propTypes.object,
    // items: propTypes.arrayOf(propTypes.object).isRequired,
  }
  
  Cart.defaultProps = {
    // onAdd: () => {}, // Значение по умолчанию - функция-заглушка
    // cart: {},
    // items: [],
  }
  
  export default React.memo(Cart);