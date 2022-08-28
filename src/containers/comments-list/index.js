import React, {useCallback, useEffect, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { useParams } from "react-router-dom";
import CommentsCounter from "../../components/comments-counter";
import CommentsForm from "../../components/comments-form";
import CommentBlockWrapper from "../../components/comment_block-wrapper";
import actionsComments from '../../store-redux/comments/actions';
import {sortComments} from '../../utils/counter'


function CommentsList(props) {

  const store = useStore();
  
  const {id} = useParams()

  const [formToggle, setFormToggle] = useState(true)
  const [comments, setComments] = useState()

  const storeRedux = useStoreRedux();

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
    inputComments: state.comments_creator.text,
    input: state.comments_creator,
    state: state.comments_creator.parent
  }));

  useEffect(() => {
    setComments(sortComments(selectRedux.comments))
  }, [selectRedux.comments])


  useInit(async () => {
    storeRedux.dispatch(actionsComments.loadComments(id));
  }, [selectRedux.state]);


  const select = useSelector(state => ({

    token: state.session.token,
  }));


  const {t} = useTranslate();


  return (
    <Spinner active={selectRedux.waiting}>
      <CommentsCounter length={selectRedux?.comments?.length}/>
      <CommentBlockWrapper
        data={comments}
        message={selectRedux.inputComments}
        _id={id}
        formToggle={formToggle}
        setFormToggle={setFormToggle}
       />
      {
        formToggle
        ? <CommentsForm
            _id={id}
            _type={props?.article}
            token={select.token}
            formToggle={formToggle}
            setFormToggle={setFormToggle}
          />
        : null
      }
     
    </Spinner>
  );
}

export default React.memo(CommentsList);
