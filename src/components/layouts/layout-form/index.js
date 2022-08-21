import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';

import './style.css';

function LayoutForm({head, children, onSubmit, submitText, error}) {
  const cn = bem('Form');
  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('main')}>
        {children}
        {error && <div className={cn('error')}>{error}</div>}
        <button onClick={onSubmit}>{submitText}</button>
      </div>
    </div>
  );
}

LayoutForm.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  submitText: propTypes.string.isRequired,
  error: propTypes.string,
  onSubmit: propTypes.func
};

LayoutForm.defaultProps = {
  error: ''
};

export default React.memo(LayoutForm);
