import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';
import Comment from "../comment";

function ArticleComments({ comments }) {

  // CSS классы по БЭМ
  const cn = bem('Comments');

  return (
    <div className={cn()}>
      { 
        comments.map(comment => <Comment key={comment._id} comment={comment}/>) 
      }
    </div>
  );
}


ArticleComments.propTypes = {
  comments: propTypes.array,
}

ArticleComments.defaultProps = {
  comments: [],
}

export default React.memo(ArticleComments);

