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
  users,
  profile,
  onSubmit,
  setShowForm,
  showForm,
  location,
  nested,
}) {
  const cn = bem('Comments');

  return (
    <div className={cn('List')} style={nested ? {} : { paddingLeft: '0px', borderLeft: 'none' }}>
      {comments.map((comment) => {
        const user = users.find((u) => u._id === comment.author._id);
        return (
          <div key={comment._id}>
            <Comment lang={lang} t={t} comment={comment} user={user} setShowForm={setShowForm} />

            {showForm === comment._id &&
              (profile?._id ? (
                <CommentForm
                  commentId={comment._id}
                  t={t}
                  onSubmit={onSubmit}
                  profile={profile}
                  parent={comment}
                />
              ) : (
                <CommentRedirect t={t} location={location} />
              ))}

            <CommentsList
              comments={comment.children}
              lang={lang}
              t={t}
              users={users}
              setShowForm={setShowForm}
              showForm={showForm}
              profile={profile}
              onSubmit={onSubmit}
              nested={true}
            />
          </div>
        );
      })}
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
  nested: propTypes.bool,
};

CommentsList.defaultProps = {
  nested: false,
  showForm: false,
};

export default React.memo(CommentsList);
