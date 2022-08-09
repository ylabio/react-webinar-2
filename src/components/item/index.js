import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { numberForm } from '../../utils';

// общий компонент для каталога и корзины, param2 опциональный
function Item({ code, title, param, param2, btnText, btnAction }) {
  return (
    <li className='item'>
      <p className='item__code'>{ code }</p>
      <p className='item__title'>{ title }</p>
      <p className='item__param'>{ `${numberForm(param)} ₽` }</p>
      { param2 && <p className='item__param'>{ param2 }</p> }
      <button onClick={() => btnAction(code)}>{ btnText }</button>
    </li>
  )
}

Item.propTypes = {
  code: propTypes.number,
  title: propTypes.string,
  param: propTypes.oneOfType([propTypes.string, propTypes.number]),
  param2: propTypes.oneOfType([propTypes.string, propTypes.number]),
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
