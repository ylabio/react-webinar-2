import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function Comments({ children, count, t }) {
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{`${t('comments.comments')} (${count})`}</h2>
      {children}
    </div>
  );
}

Comments.propTypes = {
  children: propTypes.node.isRequired,
  count: propTypes.number,
  t: propTypes.func,
};

Comments.defaultProps = {
  count: 0,
  t: (text) => text,
};

export default React.memo(Comments);
