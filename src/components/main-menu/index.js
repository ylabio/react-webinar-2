import React from 'react';
import './style.css';
import MLText from '../../utils/mul-lang-text';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";

function Menu(props){
  const cn = bem('MainMenu');
  return (
      <Link className={cn()} to={props.link}>{MLText('main')}</Link>
  )
}

Menu.propTypes = {
  link: propTypes.string
}

Menu.defaultProps = {
  link:'/'
}

export default React.memo(Menu);
