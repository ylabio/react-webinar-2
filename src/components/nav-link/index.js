import React from 'react'
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import Translate from '../../components/translate';
import './style.css'

function NavLink(props) {
  return (
    <Link to={props.link} className='NavLink'>
      <Translate>{props.text}</Translate>
    </Link>
  )
}

export default NavLink

NavLink.propTypes = {
  link: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
}