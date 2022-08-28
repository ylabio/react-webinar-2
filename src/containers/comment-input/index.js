import React from "react";
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";
import NewComment from "../../components/new-comment";
import UnloginText from "../../components/unlogin-text";

function CommentInput(props) {
  const exists = useSelector(state => state.session.exists);

  return (
    <>
      {
        exists ?
          props.commentId === props._id && 
            <NewComment title={'Новый ответ'} send={props.onSend}>
              <button type="button" onClick={props.closeText}>Отмена</button>
            </NewComment>
            :
            props.commentId === props._id &&
              <UnloginText text={'ответить.'} redirect={props.redirect}>
                <span className="UnloginText-out" onClick={props.closeText}>Отмена</span>
              </UnloginText>
      }
    </>
  );
}

CommentInput.propTypes = {
   commentId: propTypes.string,
  _id: propTypes.string,
  onSend: propTypes.func,
  redirect: propTypes.func,
  closeText: propTypes.func,
}

export default React.memo(CommentInput);
