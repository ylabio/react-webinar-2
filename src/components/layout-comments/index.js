import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function LayoutComments({total, text, children}) {
  const cn = bem('LayoutComments');
  return (
    <div className={cn()}>
      <h2 className={cn('head')}>
        {text.head} {`(${total})`}
      </h2>
      <div className={cn('body')}>{children}</div>
    </div>
  );
}

LayoutComments.propTypes = {
  total: propTypes.number.isRequired,
  text: propTypes.objectOf(propTypes.string).isRequired,
  children: propTypes.node
};

export default React.memo(LayoutComments);
