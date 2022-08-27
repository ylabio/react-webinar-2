import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import "./style.css";
import CommentForm from "../comment-form";

function Comment({comment, onShow, onSubmit, userName}){
    const [visibleForm, setVisibleForm] = React.useState(false);

    const cn = bem('Comment');

    const day = new Date(comment.date).toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const time = new Date(comment.date).toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
    });

    const handleClick = () => {
        onShow()
        setVisibleForm(!visibleForm)
    }

    return(
        <div className={cn()} style={{marginLeft: comment.marginLeft}}>
            <div className={cn('title')}>
                <h4>{userName}</h4>
                <span>{`${day} в ${time}`}</span>
            </div>
            <p className={cn('body')}>{comment.text}</p>
            {userName && <span className={cn('link')} onClick={handleClick}>Ответить</span>}
            {visibleForm && (
                <CommentForm
                    id={comment.id}
                    type="comment"
                    onClose={handleClick}
                    label="Новый ответ"
                    onSubmit={onSubmit}
                />
            )}
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
    onShow: PropTypes.func,
    onSubmit: PropTypes.func,
    userName: PropTypes.string
}

export default React.memo(Comment)