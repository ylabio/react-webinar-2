import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import ItemComment from "../item-comment";
import "./styles.css";

function CommentsList(props) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      {props.comments.map((item) => (
        <ItemComment
          item={item}
          key={item._id}
          replies={props.getReplies(item._id)}
          getReplies={props.getReplies}
          isAuth={props.isAuth}
          submit={props.submit}
          submitLabel={props.submitLabel}
          title={props.title}
          activeComment={props.activeComment}
          setActiveComment={props.setActiveComment}
          canselLabel={props.canselLabel}
          onSignIn={props.onSignIn}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: propTypes.arrayOf(propTypes.object).isRequired,
  getReplies: propTypes.func,
  submit: propTypes.func,
  submitLabel: propTypes.string,
  title: propTypes.string,
  canselLabel: propTypes.string,
  isAuth: propTypes.bool.isRequired,
  activeComment: propTypes.string,
  setActiveComment: propTypes.func,
  onSignIn: propTypes.func,
};

export default React.memo(CommentsList);
