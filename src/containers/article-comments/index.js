import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import {useStore as useReduxStore, useSelector as useReduxSelector} from 'react-redux'
import commentActions from '../../store-redux/comments/actions'
import ArticleComment from '../../components/article-comment'
import CommentsList from '../../components/comments-list'
import NewComment from '../../components/new-comment'
import listToTree from '../../utils/list-to-tree'
import treeToList from '../../utils/tree-to-list'
import useSelector from '../../hooks/use-selector'
import Spinner from '../../components/spinner'

const ActicleComments = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const storeRedux = useReduxStore()
  const { exists, user } = useSelector(state => state.session)
  const { data, waiting } = useReduxSelector((state) => state.comments)
  const location = useLocation()

  useEffect(() => {
    storeRedux.dispatch(commentActions.load(id))
  }, [])
  
  const initialComment = useMemo(() => ({
    postId: id,
    parentCommentId: null,
    text: ''
  }), [id])

  const [ newComment, setNewComment ] = useState({...initialComment})

  const comments = useMemo(() => {
    try {
      return treeToList(listToTree([...data.items, {
        _type: '__new',
        _id: '-1',
        text: newComment.text,
        parent: {
          _id: newComment.parentCommentId || newComment.postId,
          _type: newComment.parentCommentId ? 'comment' : 'article'
        }
      }], id), (item, level) => ({...item, depth: level}))
    } catch(e) {
      return []
    }
  }, [data.items, newComment])

  const callbacks = {
    reply: useCallback(
      (commentId) => setNewComment(() => ({
        ...initialComment, 
        parentCommentId: commentId
      })), [initialComment, setNewComment]),
    unreply: useCallback(
      () => setNewComment({...initialComment})
      , [setNewComment, initialComment]),
    send: useCallback(
      () => {
        storeRedux.dispatch(commentActions.post({...newComment}))
        setNewComment(comment => ({...comment, text: ''}))
      }, [storeRedux.dispatch, commentActions.post, newComment, setNewComment]),
    edit: useCallback(
      (txt) => {
        setNewComment(comment => ({...comment, text: txt}))
      }, [setNewComment]
    ),
    toLogin: useCallback(
      () => nav('/login', {
        state: {
          back: location.pathname
        }
      })
    , [nav, location.pathname])
  }

  const render = 
    (item) => 
      item._type === '__new' 
      ? <NewComment key={item._id} 
                    depth={item.depth} 
                    text={item.text} 
                    edit={callbacks.edit} 
                    send={callbacks.send} 
                    unreply={newComment.parentCommentId && callbacks.unreply} 
                    isLogged={exists}
                    toLogin={callbacks.toLogin}
                    parent={item.parent}
        />
      : <ArticleComment key={item._id} 
                        depth={item.depth} 
                        id={item._id} 
                        text={item.text} 
                        date={item.dateCreate} 
                        user={{name: item?.author?.profile?.name, _id: item?.author?._id}} 
                        onReply={callbacks.reply}
                        me={user?._id}
        />

  return (
    <Spinner active={waiting}>
      <CommentsList items={comments} renderItem={render}/>
    </Spinner>
  )
}

export default React.memo(ActicleComments)