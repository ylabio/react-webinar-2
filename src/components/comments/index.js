import React from 'react'
import propTypes from 'prop-types';
import './style.css'
import CommentItem from './comment-list';
import FormComment from './input-comments';
import { useState } from 'react';

function Comments({ comments, count, submitComment,id }) {
    const [mainForm, setMainForm] = useState(true)
    return (
        <div className='Comments'>
            <p className='Comments_title'>Комментарии ({count}) </p>
            <div className="Comments_wrapper">
                {
                    comments.map((comment => (<CommentItem key={comment.id} setMainForm={setMainForm} comment={comment}  submitComment={submitComment}/>
                    )
                    ))
                }
            </div>
            {
                mainForm ? <FormComment id={id}  submitComment={submitComment} type='article'/> : null
            }
        </div>
    )
}
Comments.propTypes = {
    comments: propTypes.array,
    count: propTypes.number,
    submitComment: propTypes.func,
    id:propTypes.string,
}
Comments.defaultProps = {
    comments: [],
    count: 0,
    id:'',
    submitComment: () => { },
}
export default Comments