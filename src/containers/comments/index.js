import React, {useCallback, useMemo, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useSelector from "../../hooks/use-selector";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/comments/actions';
import Spinner from "../../components/spinner";
import {Link, useLocation, useNavigate} from "react-router-dom";
import LayoutComments from "../../components/layout-comments";
import ListComments from "../../components/list-comments";
import LeaveComment from "../../components/leave-comment";
import PermissionComment from "../../components/permission-comment";

function Comments() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const storeRedux = useStoreRedux();

  useInit(async () => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const selectAuth = useSelector(state => ({
    isAuthorized: state.session.exists,
  }));

  const select = useSelectorRedux(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,

  }), shallowEqual);


  const [isReply, setIsReply] = useState('')

  const callbacks = {
    // addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
    onReply: useCallback((_id) => {
      setIsReply(_id)
    }),
    onCancelReply: useCallback(() => {
      console.log('test')
      setIsReply('')
    })
  };

 

  console.log('comments', select.comments)

  return (
    <LayoutComments title={`Комментарии (${select.count})`}>
      <ListComments items={select.comments} isAuthorized={selectAuth.isAuthorized} onSignIn={callbacks.onSignIn} isReply={isReply} onReply={callbacks.onReply} onCancelReply={callbacks.onCancelReply}/>
     {(selectAuth.isAuthorized && !isReply) && <LeaveComment reply={'comment'}/>}
     {(!selectAuth.isAuthorized && !isReply) && <PermissionComment onSignIn={callbacks.onSignIn}/>}
     
    </LayoutComments>
  );
}

export default React.memo(Comments);