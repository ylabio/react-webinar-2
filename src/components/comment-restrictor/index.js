import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './styles.css'

const CommentRestrictor = (props) => {
  const cn = bem("Comment-restrictor")
  return (
    <div className={cn()}>
      <span className={cn('link')} onClick={props.loginCallback}>{props.loginTitle},</span>
      <span> {props.procedureDescription}</span>
      <span className={cn('cancel')} onClick={props.cancelCallback}> {props.cancelTitle}</span>
    </div>
  );
};

CommentRestrictor.propTypes = {
  loginTitle: propTypes.node.isRequired,
  procedureDescription: propTypes.string,
  cancelTitle: propTypes.string,
  indentLevel: propTypes.number,
  loginCallback: propTypes.func,
  cancelCallback: propTypes.func
}

CommentRestrictor.defaultProps = {
  procedureDescription: "to leave new comment.",
  cancelTitle: "",
  indentLevel: 0,
}

export default React.memo(CommentRestrictor);