import React from 'react';
import propTypes from "prop-types";
import './style.css';

function Layout({ title, nav, actions, content }) {
  return (
    <div className='layout'>
      <h1 className='layout__title'>{title}</h1>
      <header className='layout__header'>{nav}{actions}</header>
      <main className='layout__content'>{content}</main>
    </div>
  )
}

Layout.propTypes = {
  title: propTypes.string,
  nav: propTypes.node,
  actions: propTypes.node,
  content: propTypes.node,
};

export default React.memo(Layout);
