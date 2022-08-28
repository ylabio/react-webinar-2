import React, { useCallback } from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from 'react-redux';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import Item from '../../components/item';
import Comments from '../../components/comments';
import CommentsItem from '../../components/comments/item';
import CommentsResponse from '../../components/comments/response';
import dateFormat from '../../utils/date';
import useSelector from '../../hooks/use-selector';

function CommentsList() {
  const store = useStore();
  const storeRedux = useStoreRedux();
  const { t, lang } = useTranslate();

  const [openForm, setOpenForm] = useState(false);

  const select = useSelector((state) => ({
    exists: state.session.exists,
  }));
  const selectRedux = useSelectorRedux(
    (state) => ({
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  console.log(selectRedux);
  console.log(select);

  const callbacks = {
    addComment: useCallback((_id) => storeRedux.dispatch({ type: 'comments/add-comment' }), []),
    // Пагианция
    onPaginate: useCallback((page) => store.get('catalog').setParams({ page }), []),
  };

  const renders = {
    form: useCallback(
      (item) => (
        <CommentsResponse
          openForm={}
        />
      ),
      [t]
    ),
  };

  return (
    <Spinner active={selectRedux.waiting}>
      <Comments count={selectRedux.count} t={t}>
        {selectRedux.comments.map((comment) => (
          <CommentsItem
            key={comment._id}
            userName={comment.author.profile.name}
            date={dateFormat(lang, comment.dateCreate)}
            text={comment.text}
            renderForm={renders.form}
          />
        ))}
      </Comments>
    </Spinner>
  );
}

export default React.memo(CommentsList);
