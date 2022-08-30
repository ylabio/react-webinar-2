import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function TotalComments({title, count}) {
  const cn = bem('TotalComments');

  return (
    <h2 className={cn()}>{`${title} (${count})`}</h2>
  )
}

TotalComments.propTypes = {
  title: propTypes.string.isRequired,
  count: propTypes.number.isRequired,
}

export default React.memo(TotalComments);