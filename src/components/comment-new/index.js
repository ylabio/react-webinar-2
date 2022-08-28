import React, {useState} from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function CommentNew(props){
    const cn = bem('CommentNew')
    const [text, setText] = useState('')
    return(
        <div className={cn()}>
            <span className={cn("title")}>{props.type === 'comment' ? 'Новый ответ' : 'Новый комментарий'}</span>
            <textarea className={cn('text')} placeholder='Текст' onChange={(e) => setText(e.target.value)}></textarea>
            <div className={cn('buttons')}>
                <button onClick={() => props.onPost(props.id, text, props.parent, props.type)}>отправить</button>
                {props.parent && <button onClick={props.onCancel}>отмена</button>}
            </div>
        </div>
    )
}

CommentNew.propTypes = {
    type: propTypes.string,
    id: propTypes.string,
    parent: propTypes.string,
    onCancel: propTypes.func,
    onPost: propTypes.func
}

CommentNew.defaultProps = {
    type: '',
    id: '',
    parent: '',
    onCancel: () => {},
    onPost: () => {}
}

export default React.memo(CommentNew)