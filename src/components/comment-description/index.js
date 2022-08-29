import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./styles.css";

const CommentDescription = (props) => {
  let cn = bem("Comment-description");
  return (
    <div className={cn()}>
      <div>
        <span onClick={props.redirect} className={cn("alert-redirect")}>
          Войдите
        </span>
        , чтобы иметь возможность {props.text}
        {props.cancelButton ? (
          <span
            className={cn("alert-cancel")}
            onClick={() => {
              props.setToggleCreateComment(true);
              props.changeShowForm(props.comment._id, false);
            }}
          >
            Отмена
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

CommentDescription.propTypes = {
  redirect: propTypes.func,
  text: propTypes.string,
  cancelButton: propTypes.bool,
  setToggleCreateComment: propTypes.func,
  changeShowForm: propTypes.func,
};

export default React.memo(CommentDescription);
