import React from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import "./style.css";

function CommentForm(props) {
    const cn = bem('CommentForm');
    const [text, setText] = React.useState('');

    const payload = {
        text,
        parent: {
            _id: props.id,
            _type: props.type,
        },
    };

    const handleSubmit = (e) => {
      e.preventDefault()
        props.onSubmit(payload)
        setText('')
        props.onClose()
    }

    return (
        <form className={cn()} onSubmit={handleSubmit}>
            <label htmlFor="textarea">{props.label}</label>
            <textarea name="textarea" rows={5} value={text} onChange={(e) => setText(e.target.value)}/>
            <div className={cn('btn-block')}>
                <button type="submit" disabled={!text}>Отправить</button>
                {props.label === 'Новый ответ' && <button type="button" onClick={props.onClose}>Отменить</button>}
            </div>
        </form>
    )
}

CommentForm.propTypes = {
    label: PropTypes.oneOf(['Новый комментарий', 'Новый ответ']),
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
}

export default React.memo(CommentForm)