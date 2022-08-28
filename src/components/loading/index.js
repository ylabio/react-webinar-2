import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Loading({text}) {
  const cn = bem('Loading');

  return (
  <div className={cn()}>{text}</div>
  )
}

Loading.propTypes = {
  text: propTypes.string.isRequired,
}

export default React.memo(Loading);
