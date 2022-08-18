import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from 'react-router-dom';

function Navigation(props) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={`/`}>{props.language.mainPage}</Link>
    </div>
  )
}

Navigation.propTypes = {
  language: propTypes.object.isRequired
}

Navigation.defaultProps = {
}

export default React.memo(Navigation);
