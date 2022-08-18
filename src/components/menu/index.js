import React from 'react';
import {Link} from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Menu() {
  const cn = bem('Menu');

  let menus = [
    { title: 'Главная', link: '/'},
  ];

  return (
    <div className={cn()}>{menus.map(item =>
      <div key={item.title} className={cn('item')}>
        <Link to={`${item.link}`} className={cn('link') }>{item.title}</Link>
      </div>
    )}
    </div>
  )  
}

export default React.memo(Menu);