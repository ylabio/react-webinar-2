import React from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutComments(props) {
  const cn = bem('LayoutComments');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {props.head}
      </div>
      <div className={cn('content')}>
        {props.children}
      </div>
    </div>
  );
}

LayoutComments.propTypes = {
  head: PropTypes.node,
  children: PropTypes.node
};

LayoutComments.defaultProps = {
  title: 'Комментарии'
};

export default React.memo(LayoutComments);
