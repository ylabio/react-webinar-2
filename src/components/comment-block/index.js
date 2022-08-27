import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './styles.css'

const CommentBlock = ({ comment }) => {
  const cn = bem("CommentBlock");
  return <div className={cn()}>{comment}</div>;
};

CommentBlock.propTypes = {
  comment: propTypes.node.isRequired,
};

export default React.memo(CommentBlock);