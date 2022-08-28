import React, { useCallback, useState } from "react";
import Stack from "../stack";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

const Comments = ({data, addComment, isPermit, renderLink, renderForm, renderComment}) => {
  const cn = bem("Comments");
  const [state, setState] = useState({ current: {}, message: "" });

  const cb = {
    onFormInpChange: useCallback((e) => {
      setState((prev) => ({ ...prev, message: e.target.value }));
    }, []),
    onComment: useCallback(
      (i, data) => () => {
        setState((prev) => {
          const isSameNumber = prev.idx === i;
          const isNumber = typeof prev.idx === "number";
          return {
            ...prev,
            message: !isSameNumber && isNumber ? "" : prev.message,
            current: isSameNumber ? {} : data,
            idx: !isNumber ? i : isSameNumber ? null : i,
          };
        });
      },
      []
    ),
    onCloseCommentForm: useCallback(() => {
      setState((prev) => ({ ...prev, idx: null, current: {} }));
    }, []),
    addComment: useCallback(() => {
      addComment({ ...state.current, message: state.message });
    }, [state]),
  };

  const CommentsEl = data.map((comment, i) =>
    renderComment({
      data: comment,
      key: comment._id,
      onComment: cb.onComment(i + 1, {
        _id: comment._id,
        _type: comment._type,
        lvl: comment.lvl,
      }),
    })
  );

  CommentsEl.splice(
    state.idx || CommentsEl.length,
    0,
    isPermit ? (
      <div
        key={"blabla1"}
        className={cn({ lvl: Math.min(state.current.lvl || 0, 5) })}
      >
        {renderForm({
          onSubmit: cb.addComment,
          value: state.message,
          title: state.idx ? "Новый ответ" : undefined,
          onClose: cb.onCloseCommentForm,
          onChange: cb.onFormInpChange,
        })}
      </div>
    ) : (
      <div
        key={"blabla2"}
        className={cn( 'link' , { lvl: Math.min(state.current.lvl || 0, 5) })}
      >
        {renderLink}
      </div>
    )
  );

  return (
    <Stack px={"large"} py={"normal"} spacing={"large"} className={cn()}>
      <h3>Коментарии ({data?.length || 0})</h3>
      {CommentsEl}
    </Stack>
  );
};

Comments.propTypes = {
  data: propTypes.array.isRequired,
  addComment: propTypes.func,
  isPermit: propTypes.bool,
  renderLink: propTypes.node.isRequired,
  renderForm: propTypes.func.isRequired,
  renderComment: propTypes.func.isRequired,
}

Comments.defaultProps = {
  addComment: () => {},
  isPermit: false,
}

export default React.memo(Comments);
