import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import LeaveComment from '../leave-comment';
import PermissionComment from '../permission-comment'
import dateFormat from '../../../utils/dateFormat';


function ItemComments(props) {
  const cn = bem('ItemComments');
  
  const callbacks = {
    onReply: useCallback(() => {
      props.onReply(props.item._id);
    }, [props.item._id]),
  };

  return (
    <div className={cn()} style={{paddingLeft: `${(props.item.level > 10) ? 10 * 30 : props.item.level * 30}px`}}>
      <div className={cn('title')}>
        <span className={cn('author')}>{props.item?.author?.profile?.name}</span>
        <span className={cn('date')}>{dateFormat(props.item.dateCreate)}</span>
      </div>
      <div className={cn('text')}>{props.item.text}</div>
      <button className={cn('button')} onClick={callbacks.onReply}>Ответить</button>
      {(!props.isAuthorized && props.isReply === props.item._id) && 
      <PermissionComment onSignIn={props.onSignIn} reply={'reply'} onCancelReply={props.onCancelReply}/>}

      {(props.isAuthorized && props.isReply === props.item._id) && 
      <LeaveComment reply={'reply'} onCancelReply={props.onCancelReply} id={props.item._id} onAddComment={props.onAddComment}/>}
    </div>
  )
}

ItemComments.propTypes = {

}

ItemComments.defaultProps = {

}

export default React.memo(ItemComments);