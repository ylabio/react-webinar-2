import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";

function CustomLink(props) {
  const cn = bem('CustomLink');

  return <Link className={cn()} to={props.link}>{props.text}</Link>

}

CustomLink.propTypes = {
  text: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
}

export default React.memo(CustomLink);
