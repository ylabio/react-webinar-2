import React, { useCallback } from 'react';
import { useSelector as useSelectorRedux } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import LayoutFlex from '../../components/layout-flex';
import CommentsTitle from '../../components/comments-title';
import CommentsLogin from '../../components/comments-login';
import CommentsList from '../../components/comments-list';

function CommentsContainer() {
	const select = useSelectorRedux(state => ({
		commentsItems: state.comments.items,
		commentsCount: state.comments.itemsCount
	}));

	const selectStore = useSelector(state => ({
		exists: state.session.exists
	}));

	const navigate = useNavigate();
	
	const callbacks = {
		onSignIn: useCallback(() => {
			navigate('/login', {state: {back: location.pathname}});
		}, [location.pathname]),
	};

	const renders = {
    commentItem: useCallback(item => (
      <div>
				{item.text}
			</div>
    ), []),
  }

	return (
		<LayoutFlex flex="start" indent="very-big" flexDirection="column" alignItems="start" marginItems="0">
      <CommentsTitle commentsCount={select.commentsCount} /*exists={selectStore.exists}*//>
			{/* {select.commentsItems.map(item => <div>{item.text}</div>)} */}
			<CommentsList commentsItems={select.commentsItems}/>
			<CommentsLogin title="чтобы иметь возможность комментировать" exists={selectStore.exists} onSignIn={callbacks.onSignIn}/>
			{/* {!selectStore.exists && <div>Войдите, чтобы иметь возможность комментировать</div>} */}
			{selectStore.exists && <div>Main form</div>}
    </LayoutFlex>
	)
}

export default React.memo(CommentsContainer);