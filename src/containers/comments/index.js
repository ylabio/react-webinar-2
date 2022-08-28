import React, {useCallback,useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import { useParams } from 'react-router-dom';
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import actionsComments from './../../store-redux/comments/actions'
import listToTree from './../../utils/list-to-tree/index';
import treeToList from "../../utils/tree-to-list";
import actionsCommentForm from './../../store-redux/comment-form/actions'
import Comments from "../../components/comments";
import { useNavigate } from 'react-router-dom';

function CommentsContainer() {

  const storeRedux = useStoreRedux();
  const params = useParams();
  const navigate = useNavigate()

  const [text, setText] = useState('');
  const [place, setPlace] = useState('article');
  const [parentId, setParentId] = useState(params.id);

  const selectRudux = useSelectorRedux(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting
  }), shallowEqual);

  const selectState = useSelector(state => ({
    exists: state.session.exists,
  }));

  const callbacks = {
    sendComment: useCallback(async() => {
      await storeRedux.dispatch(actionsCommentForm.send({text: text, parent: {_id: parentId, _type: place}}));
      storeRedux.dispatch(actionsComments.load(params.id));
      setText(''); setPlace('article'), [selectRudux.comments]
    }),
    changePlace: useCallback((value) => {setPlace(value)}, []),
    changeText: useCallback((value) => {setText(value)}, []),
    changeParentId: useCallback((value) => {setParentId(value)}, []),
    cancelComment: useCallback(() => {setText(''); setPlace('article'); setParentId(params)}, []),
    onSignIn: useCallback(() => {navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  };
  
  const options = {
    categories: useMemo(() => [
      ...treeToList(
    listToTree(selectRudux.comments.items||[],params),
    (item, level) => ({_id:item._id, text:item.text, dateCreate:item.dateCreate, author:item.author.profile.name, level: level})  
    )], [selectRudux.comments.items]),
  }
  
  return (
    <Spinner active={selectRudux.waiting}>
      <Comments
       comments={options.categories} 
       sendComment={callbacks.sendComment}
       changePlace={callbacks.changePlace} 
       changeText={callbacks.changeText} 
       changeParentId={callbacks.changeParentId} 
       cancelComment={callbacks.cancelComment} 
       text={text}
       place={place}
       parentId={parentId}
       exists={selectState.exists}
       link={callbacks.onSignIn}

      />
    </Spinner>
  );
}

export default React.memo(CommentsContainer);
