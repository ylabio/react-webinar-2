import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css'

const BaseComment = (props) => {
  const cn = bem('Base-comment')
  return (
    <div className={cn()}>
      {props.comment}
    </div>
  );
};

BaseComment.propTypes = {
  comment: propTypes.node.isRequired
}

export default React.memo(BaseComment);