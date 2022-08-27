import React, {useCallback, useState} from "react";
import {useStore as useStoreRedux} from "react-redux";
import actionsComments from '../../store-redux/article-comments/actions'
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import CommentNew from '../../components/comment-new';
import propTypes from 'prop-types';
import CommentAllowed from "../../components/comment-allowed";

function NewCommentContainer({ parent, isNewComment, onCancel, onSubmit }) {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    user: state.session.user,
    exists: state.session.exists,
  }));
  const [text, setText] = useState("");
  const callbacks = {
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
  };
  const submitComment = (e) => {
    e.preventDefault();
    if (text) {
      storeRedux.dispatch(
        actionsComments.post(text, parent, isNewComment ? "article" : "comment")
      );
      onSubmit();
    }
  };
  return (
    <>
      {select.exists ? (
        <CommentNew
          title={isNewComment ? "Новый комментарий" : "Новый ответ"}
          value={text}
          submitTitle={"Отправить"}
          cancelTitle={isNewComment ? "" : "Отмена"}
          onChangeValue={setText}
          onSubmit={submitComment}
          onCancel={!isNewComment && onCancel}
        />
      ) : (
        <CommentAllowed
          loginTitle={"Войдите"}
          cancelTitle={isNewComment ? "" : "Отмена"}
          onCancel={isNewComment ? () => {} : onCancel}
          onlogin={callbacks.onSignIn}
          loginText={
            isNewComment
              ? "чтобы иметь возможность комментировать"
              : "чтобы иметь возможность ответить."
          }
        />
      )}
    </>
  );
}

NewCommentContainer.propTypes = {
  parent: propTypes.string.isRequired,
  isNewComment: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

NewCommentContainer.defaultProps = {
  parent: "",
  isNewComment: true,
  onCancel: () => {},
};

export default React.memo(NewCommentContainer);
