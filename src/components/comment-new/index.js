import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './styles.css'
import propTypes from 'prop-types';

const CommentNew = (props) => {
    const cn = bem('Comment-New')
    console.log(props.checkTo)

    return (
        <div className={cn(!props.checkTo ? '' : 'article')}>
            <span className={cn("title")}>{props.newCommentTitle}</span>
            <textarea className={cn('section')} value={props.value} onChange={(e) => props.setValueCallback(e.target.value)}></textarea>
            <div className={cn('controls')}>
                <button onClick={props.submitCallback}>{props.submitTitle}</button>
                {props.cancelTitle && <button onClick={props.cancelCallback}>{props.cancelTitle}</button>}
            </div>
        </div>
    );
};

CommentNew.propTypes = {
    newCommentTitle: propTypes.string,
    value: propTypes.string,
    setValueCallback: propTypes.func,
    submitTitle: propTypes.string,
    cancelTitle: propTypes.string,
    submitCallback: propTypes.func,
    cancelCallback: propTypes.func
}

CommentNew.defaultProps = {
    newCommentTitle: "New comment",
    submitTitle: "Submit",
}

export default React.memo(CommentNew);