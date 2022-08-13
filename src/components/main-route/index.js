import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Translate from '../../app/translate';

function MainRoute({to}) {
  const cn = bem('MainRoute');

  return (
    <Link to={to} className={cn('link')}>
      <Translate text={'Главная'} />
    </Link>
  );
}

MainRoute.propTypes = {
  to: propTypes.string.isRequired,
};

export default MainRoute;