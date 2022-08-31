import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentsWrapper({ children, count, t }) {
  const cn = bem('Comments');
  return (
    <div className={cn('Wrapper')}>
      <div className={cn('Title')}>
        {t('comments')} ({count})
      </div>
      {children}
    </div>
  );
}

CommentsWrapper.propTypes = {
  children: propTypes.node,
  count: propTypes.number.isRequired,
  t: propTypes.func.isRequired,
};

export default React.memo(CommentsWrapper);
