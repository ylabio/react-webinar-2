import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Layout({head, children, name, onClick}){
  // name вынес как прос потому, что хотел сделать для модульника отдельный лайаут, поэтому сделал так, но потом понял, что идея фигня
  // Тем не менее, это наверно добавило реюзабельности коду
  const cn = bem(name); 
  
  return (
    <div className={cn()}
         onClick={onClick}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  name: propTypes.string,
  onClick: propTypes.func
}

Layout.defaultProps = {
  name: "Layout",
  onClick: () => {}
}

export default React.memo(Layout);
