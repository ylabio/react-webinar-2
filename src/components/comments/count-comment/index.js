import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CountComment({ count }) {
  const cn = bem('Count');

  return <div className={cn()}>{`Комментарии (${count})`}</div>;
}

CountComment.propTypes = {
  count: propTypes.number.isRequired,
};

export default React.memo(CountComment);
