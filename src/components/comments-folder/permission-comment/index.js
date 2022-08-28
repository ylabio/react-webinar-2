import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';


function PermissionComment(props) {
  const cn = bem('PermissionComment');

  return (
    <div className={cn()}>
      <span className={cn('signIn')} onClick={props.onSignIn}>Войдите</span>, чтобы иметь возможность {props.reply === 'reply' ? 'ответить ' : 'комментировать. '}
      {props.reply === 'reply' && <span className={cn('cancel')} onClick={props.onCancelReply}>Отмена</span>}
    </div>
  )
}

PermissionComment.propTypes = {
  onSignIn: propTypes.func.isRequired,
  onCancelReply: propTypes.func.isRequired,
  reply: propTypes.string,
}

PermissionComment.defaultProps = {
  onSignIn: () => {},
  onCancelReply: () => {},
}

export default React.memo(PermissionComment);