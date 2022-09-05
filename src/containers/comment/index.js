import React, { useCallback, useState } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import CommentsInfo from '../../components/comments/info';
import CommentsLoginText from '../../components/comments/login-text';
import CommentsForm from '../../components/comments/form';
import actionsComments from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

const Comment = React.forwardRef(({ userName, date, text, level, commentId }, ref) => {
  const storeRedux = useStoreRedux();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    exists: state.session.exists,
    userId: state.session.user._id,
  }));
  const selectRedux = useSelectorRedux(
    (state) => ({
      currentOpenForm: state.comments.currentOpenForm,
    }),
    shallowEqual
  );

  const [openForm, setOpenForm] = useState(false);

  const callbacks = {
    addComment: useCallback(
      (text) =>
        storeRedux.dispatch(actionsComments.addComment(commentId, select.userId, text, 'comment')),
      [commentId, select.userId]
    ),
    changeCurrentOpenForm: useCallback(
      (flag = true) => storeRedux.dispatch(actionsComments.changeCurrentOpenForm(flag, commentId)),
      [commentId]
    ),
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }),
  };

  const options = {
    marginLeft: level * 30 > 330 ? 330 : level * 30,
  };

  const renders = {
    renderForm: useCallback(
      () => (
        <>
          {openForm &&
            selectRedux.currentOpenForm === commentId &&
            (!select.exists ? (
              <CommentsLoginText
                closeForm={() => setOpenForm(false)}
                t={t}
                changeCurrentOpenForm={() => callbacks.changeCurrentOpenForm(false)}
                onSignIn={callbacks.onSignIn}
              />
            ) : (
              <CommentsForm
                title={t('comment.newAnswer')}
                closeForm={() => setOpenForm(false)}
                addComment={callbacks.addComment}
                changeCurrentOpenForm={() => callbacks.changeCurrentOpenForm(false)}
                autoFocus={true}
                t={t}
              />
            ))}
        </>
      ),
      [openForm, select.exists, selectRedux.currentOpenForm]
    ),
  };

  return (
    <CommentsInfo
      userName={userName}
      date={date}
      text={text}
      openForm={() => setOpenForm(true)}
      marginLeft={options.marginLeft}
      renderForm={renders.renderForm}
      changeCurrentOpenForm={callbacks.changeCurrentOpenForm}
      t={t}
      ref={ref}
    />
  );
});

CommentsInfo.propTypes = {
  userName: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  level: propTypes.number,
  commentId: propTypes.number,
};

CommentsInfo.defaultProps = {
  level: 0,
  setCurrentOpenForm: () => {},
};

export default React.memo(Comment);
