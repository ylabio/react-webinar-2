import React from 'react'
import './style.css'
import propTypes from 'prop-types';
import { useState } from 'react';
import FormComment from '../input-comments';
import NoAcces from '../../no-access';
function CommentItem({ comment, setMainForm,submitComment }) {
    
    const [formModal, setFormModal] = useState(false)
    function close(){
        setFormModal(false)
        setMainForm(true)
    }
    return (
        <div className='Comment-wrapper' style={{ marginLeft: comment.marginLeft >= 390 ? 390 : comment.marginLeft }}>
            <div className='Comment-name-data'>
                <p className='Comment-profile-name'>{comment.author}</p>
                <p className='Comment-date'>{comment.date}</p>
            </div>
            <div className='Comment-text'>

                <p>{comment.text}</p>
            </div>
            <p className='Comment-answer' onClick={() => {
                setFormModal(true)
                setMainForm(false)
            }}>Ответить</p>
            {
                formModal ? (
                    localStorage.getItem('token') ? <FormComment close={close} id={comment.id} submitComment={submitComment} type='comment' additComponents={<button onClick={() => close()}>Отмена</button>} /> : <NoAcces path='/login' setFormModal={setFormModal} />
                ) : null
            }

        </div>
    )
}
CommentItem.propTypes = {
    comment: propTypes.object,
    setMainForm: propTypes.func,
}
CommentItem.defaultProps = {
    comment: {},
    setMainForm: () => { }
}
export default CommentItem