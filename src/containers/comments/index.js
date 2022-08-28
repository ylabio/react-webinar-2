import React from 'react';
import useInit from '../../hooks/use-init';
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual,} from 'react-redux';
import actionsComments from '../../store-redux/comments/actions';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentsCard from '../../components/comments-card';
import Comment from '../../components/comment';
import CommentsForm from '../../components/comments-form';
import CommentsLogin from "../../components/comments-login";
import Protected from "../protected";

function Comments() {
	const params = useParams();
	const storeRedux = useStoreRedux();
	const navigate = useNavigate();
	const location = useLocation();
	const [show, setShow] = React.useState(true);
	const [showId, setShowId] = React.useState("");

	useInit(async () => {
		storeRedux.dispatch(actionsComments.load(params.id));
	}, []);

	const select = useSelectorRedux(
		(state) => ({
			article: state.article.data,
			comments: state.comments.data,
		}),
		shallowEqual
	);

	const callbacks = {
		post: React.useCallback((data, id, showId) => {
			storeRedux.dispatch(actionsComments.post(data, id, showId));
			setShow(true);
			setShowId("");
		}, []),
		show: React.useCallback((id) => {
			setShow(false);
			setShowId(id);
		}, []),
		hide: React.useCallback(() => {
			setShow(true);
			setShowId("");
		}, []),
		login: React.useCallback(() => {
			navigate('/login', {state: {back: location.pathname}});
		}, []),
	};

	const comments = React.useMemo(() =>
			treeToList(
				listToTree(select.comments, undefined, select.article._id),
				(item, i) => ({
					id: item._id,
					author: item.author.profile.name,
					text: item.text,
					level: 20 * i <= 300 ? 20 * i : 300,
					date: item.dateCreate
				})
			),
		[select.comments]
	)

	return (
		<CommentsCard>
			<div className={"CommentsCard-title"}>Комментарии {`(${select.comments.length || 0})`}</div>
			{comments && comments.map(comment => (
				<Comment key={comment.id} comment={comment} show={callbacks.show}>
					<Protected show={comment.id === showId} blank={<CommentsLogin login={callbacks.login} hide={callbacks.hide}/>}>
						<CommentsForm id={comment.id} type="comment" post={callbacks.post} title="Новый ответ" show={comment.id === showId} hide={callbacks.hide}/>
					</Protected>
				</Comment>
			))}
			<Protected show={show} blank={<CommentsLogin login={callbacks.login} hide={callbacks.hide}/>}>
				<CommentsForm id={select.article._id} type="article" post={callbacks.post} title="Новый комментарий" show={show} hide={callbacks.hide}/>
			</Protected>
		</CommentsCard>
	);
}

export default React.memo(Comments);