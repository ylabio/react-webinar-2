import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Comment from '../comment';
import CommentForm from '../comment-form';
import CommentRedirect from '../comment-redirect';

function CommentsList({
  comments,
  lang,
  t,
  commentId,
  users,
  profile,
  onSubmit,
  setShowForm,
  showForm,
  location,
  parent,
}) {
  const cn = bem('Comments');

  return (
    <div className={cn('List')} style={commentId ? {} : { paddingLeft: '0px', borderLeft: 'none' }}>
      {comments.map((comment) => {
        const user = users.find((u) => u._id === comment.author._id);
        return (
          <div key={comment._id}>
            <Comment lang={lang} t={t} comment={comment} user={user} setShowForm={setShowForm} />
            <CommentsList
              comments={comment.children}
              lang={lang}
              t={t}
              commentId={comment._id}
              users={users}
              setShowForm={setShowForm}
              showForm={showForm}
              profile={profile}
              onSubmit={onSubmit}
              parent={comment}
            />
          </div>
        );
      })}
      {showForm === commentId &&
        (profile?._id
          ? commentId && (
              <CommentForm
                commentId={commentId}
                t={t}
                onSubmit={onSubmit}
                profile={profile}
                parent={parent}
              />
            )
          : commentId && <CommentRedirect t={t} location={location} />)}
    </div>
  );
}

CommentsList.propTypes = {
  comments: propTypes.array.isRequired,
  t: propTypes.func.isRequired,
  commentId: propTypes.string,
  articleId: propTypes.string,
  lang: propTypes.string.isRequired,
  users: propTypes.array.isRequired,
};

CommentsList.defaultProps = {
  userId: '',
  showForm: false,
};

export default React.memo(CommentsList);
