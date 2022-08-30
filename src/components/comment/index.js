import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import "./style.css";
import CommentForm from "../comment-form";

function Comment({comment, onShow, onHide, onSubmit, userName, isLogged, onLink, subFormId}) {

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

    return (
        <div className={cn()} style={{marginLeft: comment.marginLeft}}>
            <div className={cn('title')}>
                <h4>{userName}</h4>
                <span>{`${day} в ${time}`}</span>
            </div>
            <p className={cn('body')}>{comment.text}</p>
            <span className={cn('link')} onClick={() => onShow(comment.id)}>Ответить</span>
            {(isLogged && (comment.id === subFormId))
                ? (
                    <CommentForm
                        id={comment.id}
                        type="comment"
                        label="Новый ответ"
                        onSubmit={onSubmit}
                        onHide={onHide}
                    />
                )
                : (!isLogged && (comment.id === subFormId) &&
                    (<footer className={cn('footer')}>
                        <span className={cn('entrance')} onClick={onLink}>Войдите</span>
                        <span>, чтобы иметь возможноть комментировать.</span>
                        &nbsp;
                        <span className={cn('exit')} onClick={onHide}>Отмена</span>
                    </footer>)
                )}
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func,
    userName: PropTypes.string,
    isLogged: PropTypes.bool,
    onLink: PropTypes.func,
    subFormId: PropTypes.string
}

export default React.memo(Comment)