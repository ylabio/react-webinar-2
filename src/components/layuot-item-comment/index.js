import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutItemComment(props) {
  const cn = bem('LayoutItemComment');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        {props.content}
      </div>
      <div className={cn('form')}>
        {props.form}
      </div>
    </div>
  );
}

LayoutItemComment.propTypes = {
  content: PropTypes.node,
  form: PropTypes.node
};

export default React.memo(LayoutItemComment);
