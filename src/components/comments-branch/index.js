import React, { useCallback, useEffect, useRef, useState } from "react";
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
  updateBranchState,
  branchState,
}) {
  const cn = bem('CommentsBranch');
  const [isHidden, setIsHidden] = useState(typeof branchState === 'object' ? false : branchState);

  useEffect(() => {
    if (typeof branchState === 'object') {
      updateBranchState(branchState);
    } else {
      setIsHidden(branchState);
    }
  }, [branchState])

  const callbacks = {
    changeBranchState: useCallback((flag) => {
      updateBranchState({[branch[0].comment._id]: flag});
    }, [branch[0].comment._id]),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper', {hidden: isHidden})}>
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
};

CommentsBranch.defaultProps = {
  lastCommentId: '',
};

export default React.memo(CommentsBranch);