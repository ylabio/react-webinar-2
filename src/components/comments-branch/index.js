import React from "react";
import Comment from "../comment";
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function CommentsBranch({ 
  branch, 
  exists, 
  link,
  setShowCommentForm,
  lastCommentId,
  setLastCommentId,
  createResponse,
}) {
  const cn = bem('CommentsBranch');

  return (
    <div className={cn()}>
      {branch.map(obj => (
        <Comment 
          data={obj.comment} 
          key={obj.comment._id} 
          lvl={obj.lvl} 
          exists={exists}
          link={link}
          setShowCommentForm={setShowCommentForm}
          lastCommentId={lastCommentId}
          setLastCommentId={setLastCommentId}
          createResponse={createResponse}
        />
      ))}
    </div>
  );
}

CommentsBranch.propTypes = {
  branch: propTypes.array.isRequired, 
  exists: propTypes.bool.isRequired, 
  link: propTypes.string.isRequired,
  setShowCommentForm: propTypes.func.isRequired,
  lastCommentId: propTypes.string,
  setLastCommentId: propTypes.func.isRequired,
  createResponse: propTypes.func.isRequired,
};

CommentsBranch.defaultProps = {
  lastCommentId: '',
};

export default React.memo(CommentsBranch);