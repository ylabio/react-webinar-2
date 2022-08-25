import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Header(props) {
  const cn = bem('Header');

  const link = () => {
    if (props.user.isLogged) {
      return (
        <button className={cn('link')} onClick={props.signOut}>
          Выход
        </button>
      );
    } else {
      return (
        <Link to="/login">
          <button className={cn('link')}>Вход</button>
        </Link>
      );
    }
  };

  return (
    <header className={cn()}>
      <div className={cn('wrapper')}>
        <Link to="/user" className={cn('mail')}>
          {props.user.user.email}
        </Link>
        {link()}
      </div>
    </header>
  );
}

export default React.memo(Header);
