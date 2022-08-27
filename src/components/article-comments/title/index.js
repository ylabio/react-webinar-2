import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Title({ count }) {

  // CSS классы по БЭМ
  const cn = bem('Comments');

  return <div className={cn('title')}>Комментарии ({count})</div>
}

Title.propTypes = {
  count: propTypes.number,
}

Title.defaultProps = {
  count: 0,
}

export default React.memo(Title);
