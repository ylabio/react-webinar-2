import React from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const LinkToMain = () => {
  const cn = bem('LinkToMain');
  return (
    <Link className={cn()} to="/">
      Главная
    </Link>
  );
};

export default React.memo(LinkToMain);
