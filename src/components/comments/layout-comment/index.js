import React from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function LayoutComments(props) {
  const cn = bem('LayoutComments');

  return (
    <div className={cn()}>
      <p className={cn('title')}>{props.title} ({props.commentsCount})</p>
      {props.children}
    </div>
  );
}

LayoutComments.propTypes = {
  title: PropTypes.string.isRequired,
  commentsCount: PropTypes.number,
  children: PropTypes.node
};

LayoutComments.defaultProps = {
  commentsCount: 0
};

export default React.memo(LayoutComments);
