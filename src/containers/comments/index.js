import React, { useCallback, useMemo } from 'react';
import {
	useStore as useStoreRedux,
	useSelector as useSelectorRedux,
	shallowEqual,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentsList from '../../components/comments-list';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import actionsComments from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function CommentsContainer() {
	const params = useParams();

	const storeRedux = useStoreRedux();

	useInit(async () => {
		storeRedux.dispatch(actionsComments.load(params.id));
		storeRedux.dispatch(actionsComments.openForm(params.id));
	}, [params.id]);

	const select = useSelectorRedux(
		(state) => ({
			comments: state.comments.data.items,
			count: state.comments.data.count,
			waiting: state.comments.waiting,
			formId: state.comments.formId,
		}),
		shallowEqual,
	);

	const callbacks = {
		createComment: useCallback(
			(text, parentId, parentType, articleId) =>
				storeRedux.dispatch(
					actionsComments.createComment(text, parentId, parentType, articleId),
				),
			[],
		),
		openForm: useCallback(
			(id) => storeRedux.dispatch(actionsComments.openForm(id)),
			[],
		),
	};

	const options = {
		comments: useMemo(
			() => select.comments && treeToList(listToTree(select.comments)),
			[select.comments],
		),
	};

	return (
		<Spinner active={select.waiting}>
			<CommentsList
				comments={options.comments}
				count={select.count}
				createComment={callbacks.createComment}
				openForm={callbacks.openForm}
				articleId={params.id}
				formId={select.formId}
			/>
		</Spinner>
	);
}

export default React.memo(CommentsContainer);
