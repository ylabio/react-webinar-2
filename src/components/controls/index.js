import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";

function Controls({onCart, count, sum}) {
    return (
        <div className='Controls'>
       <span>В корзине:
           <span style={{fontWeight: 'bold'}}>
         {count ? `${count} ${plural(count, 'товар', 'товара', 'товаров')} / ${sum}     ₽` : 'пусто'}
       </span>
           {/*{count ? <span>{count} {plural(count, 'товар', 'товара', 'товаров')} / {sum} р</span> : <span>пусто</span>} */}
       </span>
            <button onClick={onCart}>Перейти</button>
        </div>
    )
}

Controls.propTypes = {
    onCart: propTypes.func.isRequired,
    count: propTypes.number,
    sum: propTypes.number,// Обяхательное свойство - функция
}

Controls.defaultProps = {
    onCart: () => {
    }, // Значение по умолчанию - функция-заглушка
    count: 0,
    sum: 0
}

export default React.memo(Controls);
