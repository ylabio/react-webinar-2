import React, {useCallback} from "react";
import {Link} from "react-router-dom"
import propTypes from "prop-types";
import {useStore as useStoreRedux} from "react-redux";
import actionsComments from "../../store-redux/comments/actions";
import useSelector from "../../hooks/use-selector";
import CommentItem from "../../components/comment-item";
import CommentItemFooter from "../../components/comment-item-footer";

function CommentContainer(props) {
  const storeRedux = useStoreRedux();

  const selectStore = useSelector(state => ({
    exists: state.session.exists
  }));

  const callbacks = {
    postComment: useCallback(text => storeRedux.dispatch(actionsComments.post({
      text,
      parent: {
        _id: props.comment._id,
        _type: "comment"
      }
    })), []),
  };

  const renders = {
    link: useCallback(() => <Link to="/login">Войдите</Link>, []),
  }

  return (
    <CommentItem comment={props.comment} setItemFooter={props.setItemFooter} setListFooter={props.setListFooter}>
      <CommentItemFooter 
        session={selectStore.exists}
        userName={props.comment.author.profile.name} 
        renderLink={renders.link} 
        postComment={callbacks.postComment}
        show={props.itemFooter}
        setItemFooter={props.setItemFooter}
        setListFooter={props.setListFooter}
      />
    </CommentItem>
  );
}

CommentContainer.propTypes = {
  comment: propTypes.object.isRequired,
  itemFooter: propTypes.string.isRequired,
  setListFooter: propTypes.func.isRequired,
  setItemFooter: propTypes.func.isRequired
}

export default React.memo(CommentContainer);