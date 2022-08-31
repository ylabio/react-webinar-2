import React, {useCallback} from "react";
import propTypes from "prop-types";
import {useStore as useStoreRedux} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import actionsComments from '../../store-redux/comments/actions';
import CommentForm from "../../components/comment-form";
import CommentStub from "../../components/comment-stub";

function NewComment({parent_id, parent_type, hasCancelButton, handleCancel, titleLabel, stubLabel}) {
  const storeRedux = useStoreRedux();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  const callbacks = {
    sendComment: useCallback((text) => storeRedux.dispatch(actionsComments.post(text, parent_id, parent_type)), []),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  return (
    <> {select.exists ? 
      <CommentForm 
        hasCancelButton={hasCancelButton}
        handleSubmit={(text) => callbacks.sendComment(text, parent_id, parent_type)}
        handleCancel={handleCancel}
        titleLabel={titleLabel}
      /> : 
      <CommentStub
        link={callbacks.onSignIn}
        stubLabel={stubLabel}
        hasCancelButton={hasCancelButton}
        handleCancel={handleCancel}
      />
      }
    </>
  );
}

NewComment.propTypes = {
  parent_id: propTypes.string.isRequired,
  parent_type: propTypes.string,
  hasCancelButton: propTypes.bool,
  handleCancel: propTypes.func,
  titleLabel: propTypes.string,
  stubLabel: propTypes.string,
}

NewComment.defaultProps = {
  parent_type: 'article',
  hasCancelButton: false,
  handleCancel: () => {},
  titleLabel: 'комментарий',
  stubLabel: 'комментировать',
}

export default React.memo(NewComment);
