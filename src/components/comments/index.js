import React from 'react'
import propTypes from 'prop-types';
import './style.css'
import CommentItem from './comment-list';
import FormComment from './input-comments';
import NoAcces from '../no-access';


function Comments({ comments, count, submitComment, id, exists, active, mainForm, setMainForm }) {
    return (
        <div className='Comments'>
            <p className='Comments_title'>Комментарии ({count}) </p>
            <div className="Comments_wrapper">
                {
                    comments.map((comment => (
                        <CommentItem key={comment.id}
                            active={active}
                            setMainForm={setMainForm}
                            comments={comments}
                            mainForm={mainForm}
                            exists={exists}
                            comment={comment}
                            submitComment={submitComment}
                        />
                    )
                    ))
                }
            </div>
            {
                mainForm ? (
                    exists
                        ? <FormComment id={id} submitComment={submitComment} type='article' />
                        : <NoAcces path='/login' />
                ) : null

            }
        </div>
    )
}
Comments.propTypes = {
    comments: propTypes.array,
    count: propTypes.number,
    submitComment: propTypes.func,
    id: propTypes.string,
    exists: propTypes.bool,
    mainForm: propTypes.bool,
    setMainForm:propTypes.func
}
Comments.defaultProps = {
    comments: [],
    count: 0,
    exists: false,
    id: '',
    mainForm: false,
    setMainForm: () => { },
    submitComment: () => { },
}
export default Comments