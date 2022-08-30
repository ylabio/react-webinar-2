import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Comment({ comment, setSendId, sendContainer, lang, t }) {

  console.log("Render Comment");

  // CSS классы по БЭМ
  const cn = bem("Comment");

  const date = new Date(comment.dateCreate)

  const formatter = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric", 
    minute: "numeric"
  });

  // Вариант реализации смещения согласно иерархии вложенности где - 10 level max
  // console.log("level: ", comment.level,
  //             "padding: ", comment.level % 10 !== comment.level ? 10 : comment.level);

  // В текущей реализации скрыл кнопку ответа на комментарий если уровень вложенности превышает 10
  return (
    <div style={{ paddingLeft: `${ (comment.level % 10 !== comment.level ? 10 : comment.level) * 40 }px` }} >
      <div className={cn()}>
        <div className={cn("header")}>
          <span className={cn("userName")}>
            {comment.author?.profile?.name}{" "}
          </span>
          <span className={cn("date")}>{formatter.format(date).replace('г.,', 'в')}</span>
        </div>

        <div className={cn("text")}>{comment.text}</div>

        { comment.level % 10 === comment.level && <button className={cn("btn")} onClick={() => setSendId(comment._id)}>
          {t('comment.reply')}
        </button> }
      </div>

      {sendContainer}

    </div>
  );
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  setSendId: propTypes.func,
  sendContainer: propTypes.node.isRequired,
  lang: propTypes.string,
  t: propTypes.func,
};

Comment.defaultProps = {
  setSendId: () => {},
  lang: 'ru',
  t: () => {},
};

export default React.memo(Comment);
