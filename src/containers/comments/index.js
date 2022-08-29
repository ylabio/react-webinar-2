import React, { useCallback, useEffect, useMemo, useState } from "react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Comment from "../../components/comment";
import AddNewComment from "../../components/add-new-comment";
import CommentDescription from "../../components/comment-description";
import CommentsList from "../../components/comments-list";

const Comments = ({ comments, session, submitComment, parent }) => {
  let navigate = useNavigate();
  let [toggleCreateComment, setToggleCreateComment] = useState(true);
  let [internalComments, setInternalComments] = useState(comments);

  const changeShowForm = useCallback(
    (_id, value = true) => {
      setInternalComments((val) => {
        return val.map((item) => {
          if (item._id === _id) {
            item.showCommentForm = value;
          } else item.showCommentForm = false;
          return item;
        });
      });
    },
    [internalComments]
  );

  const redirect = useCallback(() => {
    navigate("/login", { state: { back: location.pathname } });
  }, []);

  useEffect(() => setInternalComments(comments), [comments]);

  const renderComments = useMemo(
    () =>
      internalComments.map((comment) => {
        return (
          <div key={comment._id}>
          <Comment
            comment={comment}
            toggleMainComment={setToggleCreateComment}
            changeShowForm={changeShowForm}
            submitComment={(text, parent) => {
              setToggleCreateComment(true);
              changeShowForm(comment._id, false);
              submitComment(text, parent);
            }}
            token={session.token}
            description={
              <CommentDescription
                redirect={redirect}
                text={"ответить."}
                cancelButton={true}
                comment={comment}
                setToggleCreateComment={setToggleCreateComment}
                changeShowForm={changeShowForm}
              />
            }
          />
          </div>
        );
      }),
    [internalComments]
  );
  return (
    <CommentsList internalComments={internalComments}>
      {renderComments}
      <AddNewComment
        header={"Новый комментарий"}
        createCommentOpen={toggleCreateComment}
        onSubmit={submitComment}
        parent={parent.article}
        token={session.token}
        description={
          toggleCreateComment ? (
            <CommentDescription redirect={redirect} text={"комментировать"} />
          ) : (
            <></>
          )
        }
      />
    </CommentsList>
  );
};

Comments.protoTypes = {
  comments: propTypes.object,
  session: propTypes.object,
  submitComment: propTypes.func,
  parent: propTypes.object,
};

export default React.memo(Comments);
