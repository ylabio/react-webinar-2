import React from 'react';
import propTypes from 'prop-types';
import './style.css';

// общий компонент для каталога и корзины, param2 опциональный
function Item({ code, title, param, param2, btnText, btnAction }) {
  return (
    <li className='item'>
      <p className='item__code'>{ code }</p>
      <p className='item__title'>{ title }</p>
      <p className='item__param'>{ param }</p>
      { param2 && <p className='item__param'>{ param2 }</p> }
      <button onClick={() => btnAction(code)}>{ btnText }</button>
    </li>
  )
}

Item.propTypes = {
  code: propTypes.number,
  title: propTypes.string,
  param: propTypes.string,
  param2: propTypes.string,
  btnText: propTypes.string,
  btnAction: propTypes.func,
};

Item.defaultProps = {
  code: -1,
  title: 'title',
  param: 'param',
  btnText: 'btnText',
  btnAction: () => {}
};

export default React.memo(Item);
