
import { useLocation, useNavigate } from "react-router-dom";
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import TextArea from "../../components/text-area";
import React, { useCallback, useState } from "react";
import useSelector from "../../hooks/use-selector";
import CommentControl from "../../components/comments-cotrol";
import comments from '../../store-redux/article-comments/actions'
import useTranslate from "../../hooks/use-translate";
import propTypes from 'prop-types';


function CommentPlace({ padding, id }) {
  const { t } = useTranslate();
  const navigate = useNavigate()
  const storeRedux = useStoreRedux();
  const location = useLocation();
  const [showArea, setShowArea] = useState(false);
  const callBacks = {
    openArea: useCallback(() => { setShowArea(true), storeRedux.dispatch(comments.openArea(id)) }),
    closeArea: useCallback(() => { setShowArea(false), storeRedux.dispatch(comments.openArea("")) }),
    sendComment: useCallback((text, parent_id, parentType) => { storeRedux.dispatch(comments.post(text, parent_id, parentType)) }),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  }
  const selectRedux = useSelectorRedux((state) => ({
    commentAreaActive: state.comments.commentAreaActive,
  }), shallowEqual);
  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }))
  if (select.exists && showArea && id === selectRedux.commentAreaActive) {
    return (
      <TextArea t={t} callBacks={callBacks} parent={id} isToArticle={false} padding={padding} />
    )
  }
  return (
    <>
      {
        <CommentControl t={t} padding={padding} isAuth={select.exists} showArea={showArea} callBacks={callBacks} id={id} currentId={selectRedux.commentAreaActive} />
      }
    </>
  )
}

CommentPlace.propTypes = {
  padding: propTypes.number,
  id: propTypes.string.isRequired
}

CommentPlace.defaultProps = {
  padding: 0,
}



export default React.memo(CommentPlace);

