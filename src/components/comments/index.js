import React from "react";
import {cn as bem} from '@bem-react/classname';
import "./style.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector as useSelectorRedux, useStore as useStoreRedux} from "react-redux";
import useInit from "../../hooks/use-init";
import actionsComment from "../../store-redux/comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import Comment from "../comment";
import CommentForm from "../comment-form";
import LayoutForm from "../layout-form";
import useSelector from "../../hooks/use-selector";
import Protected from "../../containers/protected";

function Comments() {
    const cn = bem('Comments');
    const params = useParams();
    const storeRedux = useStoreRedux();

    const navigate = useNavigate();
    const location = useLocation();

    const [visibleForm, setVisibleForm] = React.useState(true);

    const select = useSelectorRedux(state => ({
        article: state.article.data,
        comments: state.comments.data,
        error: state.comments.error
    }))
    const userName = useSelector(state => ({...state.session.user.profile}.name))

    const options = {
        comments: React.useMemo(() => {
            return select.comments.length &&
                treeToList(listToTree(select.comments, undefined, select.article._id),
                    (item, level) => ({
                        id: item._id,
                        text: item.text,
                        author: item.author.profile?.name,
                        marginLeft: 30 * level,
                        date: item.dateCreate,
                        active: item.active,
                    })
                )
        }, [select.comments])
    }

    const callbacks = {
        onShow: React.useCallback(() => setVisibleForm(!visibleForm), [visibleForm]),
        onSubmit: React.useCallback((data) => {
            storeRedux.dispatch(actionsComment.createComment(data));
        }, []),
        onLink: React.useCallback(() => {
            navigate('/login', {state: {back: location.pathname}});
        }, [])
    }

    useInit(async () => {
        //await store.get('article').load(params.id);
        storeRedux.dispatch(actionsComment.load(params.id));
    }, [params.id]);

    return (
        <>
            <div className={cn()}>
                <h2 className={cn('title')}>Комментарии ({select.comments.length || 0})</h2>
                {options.comments?.length
                    ? (
                        options.comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                onShow={callbacks.onShow}
                                onSubmit={callbacks.onSubmit}
                                userName={userName}
                            />))
                    )
                    : ''
                }
            </div>
            {(visibleForm && userName)
                ? (<Protected redirect="/login">
                    <LayoutForm>
                        <CommentForm
                            id={select.article._id}
                            type="article"
                            label="Новый комментарий"
                            onSubmit={callbacks.onSubmit}
                        />
                    </LayoutForm>
                </Protected>)
                : (<LayoutForm>
                    <footer className={cn('footer')}>
                        <span className={cn('link')} onClick={callbacks.onLink}>Войдите</span>
                        <span>, чтобы иметь возможноть комментировать</span>
                    </footer>
                </LayoutForm>)
            }
        </>
    )
}

export default React.memo(Comments)