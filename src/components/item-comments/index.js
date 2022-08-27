import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import LeaveComment from '../leave-comment';
import PermissionComment from '../permission-comment'

function ItemComments(props) {
  const cn = bem('ItemComments');
  
  const [isReply, setIsReply] = useState(false)
  const [openReply, setOpenReply] = useState(false)
  const [closeReply, setCloseReply] = useState(false)

  const callbacks = {
    onReply: useCallback(() => {
      setIsReply(true);
    }, []),
    onCancelReply: useCallback(() => {
      setIsReply(false);
    }, []),
  };

  console.log('isAuth', props.isAuthorized)

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <span className={cn('author')}>{props.item?.author?.profile?.name}</span>
        <span className={cn('date')}>{props.item.dateCreate}</span>
      </div>
      <div className={cn('text')}>{props.item.text}</div>
      <button className={cn('button')} onClick={callbacks.onReply}>Ответить</button>
      {!props.isAuthorized && isReply && <PermissionComment onSignIn={props.onSignIn} reply={'reply'}/>}
      {props.isAuthorized && <LeaveComment reply={'reply'}/>}
    </div>
  )
}

ItemComments.propTypes = {

}

ItemComments.defaultProps = {

}

export default React.memo(ItemComments);