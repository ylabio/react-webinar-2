import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './styles.css'

const CommentAuthChecker = (props) => {
    const cn = bem("Comment-auth-checker")
    return (
        <div className={cn(!props.checkTo ? '' : 'article')}>
            <button className={cn('link')} onClick={props.loginCallback}>{props.loginTitle},</button>
            <span> {props.procedureDescription}</span>
            <button className={cn('cancel')} onClick={props.cancelCallback}> {props.cancelTitle}</button>
        </div>
    );
};

CommentAuthChecker.propTypes = {
    loginTitle: propTypes.node.isRequired,
    procedureDescription: propTypes.string,
    cancelTitle: propTypes.string,
    indentLevel: propTypes.number,
    loginCallback: propTypes.func,
    cancelCallback: propTypes.func
}

CommentAuthChecker.defaultProps = {
    procedureDescription: "",
    cancelTitle: "",
    indentLevel: 0,
}

export default React.memo(CommentAuthChecker);