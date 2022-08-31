import React, { useCallback, useEffect, useRef, useState } from "react";
import Comment from "../comment";
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import useBranchState from "./use-branch-state";
import CommentContainer from "../../containers/comment-container";

function CommentsBranch({ 
  branch, 
  exists, 
  link,
  setShowCommentForm,
  lastCommentId,
  setLastCommentId,
  createResponse,
  updateBranchState,
  branchState,
  lastCreatedId,
}) {
  const cn = bem('CommentsBranch');
  const isHidden = useBranchState(branchState, updateBranchState);

  const callbacks = {
    changeBranchState: useCallback((flag) => {
      updateBranchState({[branch[0].comment._id]: flag});
    }, [branch[0].comment._id]),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper', {hidden: isHidden})}>
      {branch.map(obj => (
        <CommentContainer 
          data={obj.comment} 
          key={obj.comment._id} 
          lvl={obj.lvl} 
          exists={exists}
          link={link}
          setShowCommentForm={setShowCommentForm}
          lastCommentId={lastCommentId}
          setLastCommentId={setLastCommentId}
          createResponse={createResponse}
          lastCreatedId={lastCreatedId}
        />
      ))}
      </div>

      <div 
        className={cn('hiddenBlock')}
        onClick={() => callbacks.changeBranchState(!isHidden)}
      >
        {isHidden && (
          <Comment 
            data={branch[0].comment} 
            key={branch[0].comment._id} 
            lvl={branch[0].lvl} 
            exists={exists}
            link={link}
            setShowCommentForm={setShowCommentForm}
            lastCommentId={lastCommentId}
            setLastCommentId={setLastCommentId}
            createResponse={createResponse}
            showResponse={false}
          />
        )}

        {branch.length > 1 && (
          <div className={cn('hide', {color: isHidden})}>
            {isHidden ? 'Показать ветку' : 'Скрыть ветку'}
          </div>
        )}

        <div className={cn('divider')}/>
      </div>
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
  updateBranchState: propTypes.func.isRequired,
  branchState: propTypes.oneOfType([
    propTypes.object.isRequired, 
    propTypes.bool.isRequired
  ]),
  lastCreatedId: propTypes.string,
};

CommentsBranch.defaultProps = {
  lastCommentId: '',
  lastCreatedId: null,
};

export default React.memo(CommentsBranch);