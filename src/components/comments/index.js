import React from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";
import CommentsItem from "../comments-item";



function Comments({parentId, comments = [], isAuthorized, openCommentForm, closeCommentForm, resetMessage, onSubmit}){

    const currentComments = comments.filter((comment) => {
        return comment.parent._id === parentId
    })

    const cn = bem('Comments');
    return (
        <div className={cn()}>
            <ul className={cn('list')}>
                {
                    currentComments.map(comment => (
                        <CommentsItem
                            id={comment._id}
                            comments={comments}
                            isAuthorized={isAuthorized}
                            date={comment.dateCreate}
                            text={comment.text}
                            key={comment.length + comment._id}
                            openCommentForm={openCommentForm}
                            closeCommentForm={closeCommentForm}
                            resetMessage={resetMessage}
                            name={comment.author.profile.name}
                            childComments={comment.children}
                            onSubmit={onSubmit}
                        />
                    ))
                }
            </ul>
        </div>
    )
}
export default React.memo(Comments);

