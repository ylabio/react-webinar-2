import React from 'react'
import './style.css'
import propTypes from 'prop-types';
import { useState } from 'react';
import FormComment from '../input-comments';
import NoAcces from '../../no-access';
import defineDate from '../../../utils/data';

function CommentItem({ comment, setMainForm, submitComment, exists, active, comments }) {
    const [form, setFomr] = useState(true)
    return (
        <div className='Comment-wrapper' style={{ marginLeft: comment.marginLeft >= 390 ? 390 : comment.marginLeft }}>
            <div className='Comment-name-data'>
                <p className='Comment-profile-name'>{comment.author}</p>
                <p className='Comment-date'>{defineDate(comment.date)}</p>
            </div>
            <div className='Comment-text'>
                <p>{comment.text}</p>
            </div>
            <p className='Comment-answer' onClick={() => {
                active(comments, comment.id)
                setFomr(!form)
                setMainForm(false)
            }}>Ответить</p>
            {
                comment.active ? (
                    exists ?
                        <FormComment close={close} id={comment.id} submitComment={submitComment} type='comment' additComponents={<button onClick={() => {
                            active(comments, comment.id)
                            setFomr(!form)
                        }}>Отмена</button>} />
                        : <NoAcces path='/login' children={<span onClick={() => {
                            active(comments, comment.id)
                            setFomr(!form)
                        }}>Отмена</span>} />
                ) : null
            }

        </div>
    )
}
CommentItem.propTypes = {
    comment: propTypes.object,
    setNoAcces: propTypes.func,
    setMainForm: propTypes.func,
    exists: propTypes.bool
}
CommentItem.defaultProps = {
    comment: {},
    exists: false,
    setMainForm: () => { },
    setNoAcces: () => { }
}
export default CommentItem