import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function MainRoute({to, translationData}) {
  const cn = bem('MainRoute');

  return (
    <Link to={to} className={cn('link')}>
      {translationData.name}
    </Link>
  );
}

MainRoute.propTypes = {
  to: propTypes.string.isRequired,
  translationData: propTypes.object.isRequired,
};

export default MainRoute;