import React, { useCallback, useEffect, useState } from "react";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Comment from "../../components/comment";
import AddNewComment from "../../components/add-new-comment";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

const Comments = ({ comments, session, submitComment, parent }) => {
  let cn = bem("Comments");
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

  return (
    <div className={cn()}>
      <div className={cn("title")}>Комментарии ({internalComments.length})</div>
      {internalComments.map((comment) => {
        return (
          <Comment
            key={comment._id}
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
              <div className={cn("comment-alert")}>
                <div>
                  <span onClick={redirect} className={cn("alert-redirect")}>
                    Войдите
                  </span>
                  , чтобы иметь возможность ответить.
                  <span
                    className={cn("alert-cancel")}
                    onClick={() => {
                      setToggleCreateComment(true);
                      changeShowForm(comment._id, false);
                    }}
                  >
                    Отмена
                  </span>
                </div>
              </div>
            }
          />
        );
      })}
      <AddNewComment
        header={"Новый комментарий"}
        createCommentOpen={toggleCreateComment}
        onSubmit={submitComment}
        parent={parent.article}
        token={session.token}
        description={
          toggleCreateComment ? (
            <div className={cn("comment-alert")}>
              <span onClick={redirect} className={cn("alert-redirect")}>
                Войдите
              </span>
              , чтобы иметь возможность комментировать
            </div>
          ) : (
            <></>
          )
        }
      />
    </div>
  );
};

Comments.protoTypes = {
  comments: propTypes.object,
  session: propTypes.object,
  submitComment: propTypes.func,
  parent: propTypes.object,
};

export default React.memo(Comments);
