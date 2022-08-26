import React from 'react';
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
	}, [params.id]);

	const select = useSelectorRedux(
		(state) => ({
			comments: state.comments.data.items,
			waiting: state.comments.waiting,
			count: state.comments.count,
		}),
		shallowEqual,
	);

	const comments = select.comments && treeToList(listToTree(select.comments));

	return (
		<Spinner active={select.waiting}>
			<CommentsList comments={comments} count={select.count} />
		</Spinner>
	);
}

export default React.memo(CommentsContainer);
