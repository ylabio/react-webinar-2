import React from 'react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';
import './styles.css'

const MenuLink = (props) => {
  return (
      <span className="PageLink"><Link to={props.link}>{props.title}</Link></span>
  );
};

MenuLink.propTypes = {
  title: string,
  link: string
}

export default React.memo(MenuLink);