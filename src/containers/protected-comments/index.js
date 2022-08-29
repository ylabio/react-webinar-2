import LoginComments from "components/comments/login-comment";
import TextEditor from "components/text-editor";
import propTypes from "prop-types";
import React, {useCallback} from "react";
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux
} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import actionsComments from "store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";

function ProtectedComments({redirect, id}) {

  const navigate = useNavigate();
  const location = useLocation();
  const storeRedux = useStoreRedux();

  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    textEditor: state.comments.textEditor,
  }), shallowEqual);

  const _type = selectRedux.article._id === id ? 'article' : 'comment';

  const callbacks = {
    onNavigate: useCallback(() => {
      navigate(redirect, {state: {back: location.pathname}});
    }, []),
    onBack: useCallback(() => storeRedux.dispatch(actionsComments.setEditor(selectRedux.article._id)), []),
    setText: useCallback((text) => storeRedux.dispatch(actionsComments.addComment(id, text, _type)), []),
  };

  if (!select.exists && !select.waiting && selectRedux.textEditor === id) {
    if (_type === 'article') {
      return <LoginComments text={' чтобы иметь возможность комментировать'}
                            onNavigate={callbacks.onNavigate}/>;
    }

    if (_type === 'comment') {
      return <LoginComments text={' чтобы иметь возможность ответить. '}
                            onNavigate={callbacks.onNavigate} onBack={callbacks.onBack}/>;
    }
  }

  if (id === selectRedux.textEditor && select.exists) {
    if (_type === 'article') {
      return <TextEditor onChange={callbacks.setText}/>;
    }

    return <TextEditor onChange={callbacks.setText} onBack={callbacks.onBack}/>;
  }

  return null;
}

ProtectedComments.propTypes = {
  redirect: propTypes.string,
  id: propTypes.string,
};

export default React.memo(ProtectedComments);
