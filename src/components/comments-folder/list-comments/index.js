import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ItemComments from "../item-comments";


function ListComments(props) {
  const cn = bem('ListComments');

  return (
    <div className={cn()}>{props.items?.map(item =>
        <ItemComments key={item._id} item={item} isAuthorized={props.isAuthorized} onSignIn={props.onSignIn} onReply={props.onReply} idReply={props.idReply} onCancelReply={props.onCancelReply} onAddComment={props.onAddComment}/>
      )}
    </div>
  )
}

ListComments.propTypes = {
  onReply: propTypes.func.isRequired,
  onCancelReply: propTypes.func.isRequired,
  onAddComment: propTypes.func.isRequired,
  isAuthorized: propTypes.bool.isRequired,
  items: propTypes.array.isRequired,
}

ListComments.defaultProps = {
  items: [],
  onReply: () => {},
  onCancelReply: () => {},
  onAddComment: () => {},
}

export default React.memo(ListComments);
