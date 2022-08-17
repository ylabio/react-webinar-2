import React from 'react';
import {Link} from "react-router-dom";
import './styles.css'

const Menu = ({pages}) => {
  return (
    <div className='Menu'>
      {pages.map(({title, path, id}) => <Link key={id} className={'Menu-link'} to={path}>{title}</Link>)}
    </div>
  );
};

export default Menu;