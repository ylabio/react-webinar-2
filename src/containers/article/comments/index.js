import React, {useCallback, useEffect, useRef} from 'react';
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux
} from 'react-redux';
import {useParams} from 'react-router-dom';
import Comment from '../../../components/comment';
import LayoutComments from '../../../components/layout-comments';
import Spinner from '../../../components/spinner';
import useInit from '../../../hooks/use-init';
import useTranslate from '../../../hooks/use-translate';
import actionsComments from '../../../services/store-redux/comments/actions';
import ProtectedCommentForm from '../../protected-comment-form';

function Comments() {
  const storeRedux = useStoreRedux();
  const params = useParams();
  const {t, lang} = useTranslate();

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(
    state => ({
      article: state.article.data._id,
      waiting: state.comments.waiting,
      comments: state.comments.items,
      total: state.comments.total,
      form: state.comments.form,
      postedId: state.comments.postedId
    }),
    shallowEqual
  );

  const callbacks = {
    onAnswer: useCallback(
      _id => storeRedux.dispatch(actionsComments.setForm({_id, _type: 'comment'})),
      []
    )
  };
  const scrollRef = useRef();
  console.log(select.postedId);
  useEffect(() => {
    if (scrollRef.current) {
      const height = window.innerHeight;
      scrollRef.current.scrollIntoView({behavior: 'smooth', top: -height / 2});
      console.log(height);
    }
  }, [select.postedId]);

  return (
    <Spinner active={select.waiting}>
      <LayoutComments
        comments={select.comments}
        total={select.total}
        text={{head: t('comments.head')}}
      >
        {select.comments.map(comment => (
          <React.Fragment key={comment.data._id}>
            <Comment
              text={{reply: t('comments.reply')}}
              data={comment.data}
              level={comment.level}
              onAnswer={callbacks.onAnswer}
              scrollRef={select.postedId === comment.data._id ? scrollRef : null}
            />
            {select.form._id === comment.data._id && (
              <ProtectedCommentForm level={comment.level} isAnswer={true} />
            )}
          </React.Fragment>
        ))}
        {select.form._id === select.article && <ProtectedCommentForm level={0} isAnswer={false} />}
      </LayoutComments>
    </Spinner>
  );
}

export default React.memo(Comments);
