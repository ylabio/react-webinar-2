import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function CommentsList({children}) {
  const cn = bem('CommentsList');

  return <div className={cn()}>{children}</div>;
}

CommentsList.propTypes = {
  children: propTypes.node
};

CommentsList.defaultProps = {};

export default React.memo(CommentsList);
