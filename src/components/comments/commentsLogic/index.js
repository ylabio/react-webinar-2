import React, { useCallback, useMemo } from 'react'
import Comments from '..'
import listToTree from '../../../utils/list-to-tree';
import treeToList from '../../../utils/tree-to-list';
import actionsComments from '../../../store-redux/comments/action'
import Spinner from '../../spinner'
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useSelector from '../../../hooks/use-selector';
import useInit from '../../../hooks/use-init';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
function CommentsWrapper() {
    const [mainForm, setMainForm] = useState(true)
    const storeRedux = useStoreRedux();
    const params = useParams();
    async function reduxCallback() {
        storeRedux.dispatch(actionsComments.loadComments(params.id))
    }
    const callbacksRedux = {
        submitComment: useCallback(async (data) => {
            storeRedux.dispatch(actionsComments.submitComment(data, reduxCallback));
        }, []),
    }
    useInit(async () => {
        storeRedux.dispatch(actionsComments.loadComments(params.id))

    }, [params.id]);
    const selectStore = useSelector(state => ({
        exists: state.session.exists
    }), shallowEqual);
    const select = useSelectorRedux(state => ({
        article: state.article.data,
        сount: state.сomments.data,
        сomments: state.сomments.data.items || [],
    }), shallowEqual);
    const options = {
        сomments: useMemo(() => {
            return (
                treeToList(
                    listToTree(select.сomments, undefined, select.article._id),
                    (item, level) => ({
                        id: item._id,
                        text: item.text,
                        author: item.author.profile?.name,
                        marginLeft: 30 * level,
                        date: item.dateCreate,
                        active: false
                    }))
            )
        }, [select.сomments]),

    }
    function active(arr, itemId) {
        arr.map((item) => {
            if (item.id === itemId) {
                item.active = !item.active
            }
            const objActive = arr.find((item) => item.active === true)
            if (objActive === undefined) {
                setMainForm(true)
            }
        })
    }
    return (
        <Spinner active={select.сomments.length === 0}>
            <Comments
                mainForm={mainForm}
                setMainForm={setMainForm}
                id={select.article._id}
                active={active}
                comments={options.сomments}
                exists={selectStore.exists}
                count={select.сomments.length}
                activeComments={callbacksRedux.activeComments}
                submitComment={callbacksRedux.submitComment}
            />
        </Spinner>
    )
}

export default CommentsWrapper