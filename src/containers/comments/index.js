import React, { useCallback } from 'react';
import { useSelector as useSelectorRedux, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LayoutFlex from '../../components/layout-flex';
import CommentsTitle from '../../components/comments-title';
import CommentsLogin from '../../components/comments-login';
import CommentsList from '../../components/comments-list';
import CommentsForm from '../../components/comments-form';
import actionsComments from '../../store-redux/comments/actions';

function CommentsContainer() {
	const select = useSelectorRedux(state => ({
		commentsItems: state.comments.items,
		commentsCount: state.comments.itemsCount,
		articleId: state.article.data._id,
		activeKey: state.comments.activeKey
	}));

	const selectStore = useSelector(state => ({
		exists: state.session.exists,
		author: {
			_id: state.session.user._id,
			username: state.session.user.username
		}
	}));
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const callbacks = {
		onSignIn: useCallback(() => {
			navigate('/login', {state: {back: location.pathname}});
		}, [location.pathname]),
		setActiveKey: useCallback((key) => {
			dispatch(actionsComments.setActiveKey(key));
		}, [])
	};

	return (
		<LayoutFlex flex="start" indent="very-big" flexDirection="column" alignItems="start" marginItems="0" widthItems="100">
      <CommentsTitle commentsCount={select.commentsCount}/>
			<CommentsList commentsItems={select.commentsItems} activeKey={select.activeKey} setActiveKey={callbacks.setActiveKey} exists={selectStore.exists} onSignIn={callbacks.onSignIn}/>
			{!selectStore.exists && select.activeKey === 'main' && 
				<CommentsLogin title="чтобы иметь возможность комментировать" onSignIn={callbacks.onSignIn} activeKey={select.activeKey}/>}
			{selectStore.exists && select.activeKey === 'main' && 
				<CommentsForm _id={select.articleId} activeKey={select.activeKey} setActiveKey={callbacks.setActiveKey} _type="article" lvl={0} author={selectStore.author}/>}
    </LayoutFlex>
	)
}

export default React.memo(CommentsContainer);