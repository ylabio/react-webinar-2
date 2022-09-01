import React, { useState } from "react";
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';

import "./style.css";

function CommentForm({ idArticle, setIdUnder, submitComment, type }) {
    const cn = bem('CommentForm');
    const [text, setText] = useState('');
    return (
        <div className={cn()} style={idArticle ? {} : { padding: "0 0 40px 0" }}>
            <span className={cn('title')}>{idArticle ? "Новый ответ" : "Новый комментарий"}</span>
            <textarea className={cn('comment')} onChange={(e) => setText(e.target.value)}></textarea>
            <div>
                <button className={cn('btn')} onClick={() => submitComment(text, type)}>Отправить</button>
                {idArticle ?
                    <button onClick={() => setIdUnder(idArticle)}>Отмена</button> :
                    null
                }
            </div>
        </div>
    );
}

CommentForm.propTypes = {
    idArticle: propTypes.string,
    setIdUnder: propTypes.func,
    submitComment: propTypes.func.isRequired,
    type: propTypes.string.isRequired
}

CommentForm.defaultProps = {
    idArticle: null,
    setIdUnder: null
}

export default React.memo(CommentForm); 