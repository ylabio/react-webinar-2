import React, { useCallback, useState } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import propTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import CommentsInfo from '../../components/comments/info';
import CommentsLoginText from '../../components/comments/login-text';
import CommentsForm from '../../components/comments/form';
import actionsComments from '../../store-redux/comments/actions';
import useSelector from '../../hooks/use-selector';

function Comment({ parentId, userName, date, text, level, commentId }) {
  const storeRedux = useStoreRedux();
  const { t } = useTranslate();

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
      (text) => storeRedux.dispatch(actionsComments.addComment(parentId, userId, text, 'comment')),
      [parentId, select.userId]
    ),
    changeCurrentOpenForm: useCallback(
      (flag = true) =>
        storeRedux.dispatch({
          type: 'comments/change-current-open-form',
          payload: { currentOpenForm: flag ? commentId : '' },
        }),
      [commentId]
    ),
  };

  const options = {
    marginLeft: level * 30 > 330 ? 330 : level * 30,
  };

  console.log(selectRedux.currentOpenForm);
  const renders = {
    renderForm: useCallback(
      () => (
        <>
          {openForm &&
            selectRedux.currentOpenForm === commentId &&
            (!select.exists ? (
              <CommentsLoginText closeForm={() => setOpenForm(false)} t={t} />
            ) : (
              <CommentsForm
                title={'новый коммент'}
                closeForm={() => setOpenForm(false)}
                addComment={callbacks.addComment}
                changeCurrentOpenForm={() => callbacks.changeCurrentOpenForm(false)}
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
    />
  );
}

CommentsInfo.propTypes = {
  parentId: propTypes.string,
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
