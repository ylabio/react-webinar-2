import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';

import './style.css';

function LayoutForm({head, children, onSubmit, submitText}) {
  const cn = bem('Form');
  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('main')}>
        {children}
        <button onClick={onSubmit}>{submitText}</button>
      </div>
    </div>
  );
}

LayoutForm.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  submitText: propTypes.string.isRequired,
  onSubmit: propTypes.func
};

export default React.memo(LayoutForm);
