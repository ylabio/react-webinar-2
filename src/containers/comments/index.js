import React, {useMemo, useCallback, useState} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import actionsComments from '../../store-redux/comments/actions';
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Comment from "../../components/comment";
import LayoutComments from "../../components/layout-comments";
import CommentNew from "../../components/comment-new";
import LoginRequired from "../../components/login-required";
import Spinner from "../../components/spinner";
import CheckLogin from "../../components/check-login";
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';


function Comments() {
    const storeRedux = useStoreRedux();
    const navigate = useNavigate();
    const params = useParams();
    const [parentCommentId, setParentCommentId] = useState(params.id);

    useInit(async () => {
        storeRedux.dispatch(actionsComments.load(params.id));
      }, [params.id]);

    const selectRedux = useSelectorRedux(state => ({
        commentsData: state.comments.data,
        waiting: state.comments.waiting
      }));
    
    const select = useSelector(state => ({
        exists: state.session.exists,
        _id: state.session.user._id
    }))
    
    const options = {
        comments: useMemo(() => treeToList(listToTree(
            selectRedux.commentsData, params.id),
            (item, level) => ({...item, depth: level})
        ), [selectRedux.commentsData] )
    }

    const callbacks = {
        onSignIn: useCallback(() => {
            navigate('/login', {state: {back: location.pathname}});
        }, [location.pathname]),

        onPost: useCallback((userId, text, parentId, parentType) => {
            storeRedux.dispatch(actionsComments.post(
                {author: {_id: userId},
                text,
                parent: {_id: parentId,
                _type: parentType}}
                )).then(setParentCommentId(params.id));
        }, []),

        onCancel: useCallback(() => {
            setParentCommentId(params.id)
        }),

        onReply: useCallback((id) => {
            setParentCommentId(id)
        })
    }
    
    return (
        <Spinner active={selectRedux.waiting}>
            <LayoutComments head={`Комментарии (${selectRedux.commentsData.length})`}>
            {options.comments.map(item => 
                <Comment item={item} key={item._id} addComment={callbacks.onReply} >
                    {item._id === parentCommentId && 
                    <CheckLogin
                        exists={select.exists}
                        loginRequired={ <LoginRequired onSignIn={callbacks.onSignIn} onCancel={callbacks.onCancel}/>}
                        component={<CommentNew id={select._id} parent={parentCommentId} onPost={callbacks.onPost} type={'comment'} onCancel={callbacks.onCancel}/>}/>}
                </Comment>)}
            {parentCommentId === params.id && 
                <CheckLogin
                exists={select.exists}
                loginRequired={ <LoginRequired onSignIn={callbacks.onSignIn} onCancel={callbacks.onCancel}/>}
                component={<CommentNew id={select._id} parent={parentCommentId} onPost={callbacks.onPost} type={'article'} onCancel={callbacks.onCancel}/>}/>}
        </LayoutComments>
        </Spinner>
        
    )
}

export default React.memo(Comments)