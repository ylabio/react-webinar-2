import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List({items, onButtonClick, itemRenderer}) {
  const cn = bem('List');
  
  // Передаем компонент itemRenderer для отрисовки элемента списка, что делает сам List переиспользуемым компонентом
  return (
    <div className={cn()}>{items.map((item) =>
      <div key={item.code} className={cn('item')}> 
        {React.createElement(itemRenderer, {item, onButtonClick})} 
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onButtonClick: propTypes.func,
  itemRenderer: propTypes.object.isRequired
}

List.defaultProps = {
  onButtonClick: () => {}
}

export default React.memo(List);
