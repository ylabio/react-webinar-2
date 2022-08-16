import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Router({to, children}) {
  const cn = bem('Router');

  return (
    <Link to={to} className={cn()}>
      {children}
    </Link>
  );
}

Router.propTypes = {
  to: propTypes.string.isRequired,
};

export default Router;