import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru";

import "./style.css";

function Comment({name, text, dateCreate, level, setIdUnder, id, commentForm}) {
  const cn = bem('Comment')
  return(
    <div className={cn()} style={{marginLeft: `${(level < 15 ? level : 15) * 30}px`}}>
      <div className={cn('info')}>
        <span className={cn('title')}>{name}</span>
        <span className={cn('date')}>{moment(dateCreate, moment.ISO_8601).locale('ru').format("DD MMMM YYYY [в] HH:mm")}</span>
      </div>

      <p className={cn('text')}>{text}</p>
      
      <button className={cn('btn')} onClick={() => setIdUnder(id)}>Ответить</button>
      {commentForm}
    </div>
  );
}

Comment.propTypes = {
  name: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  dateCreate: propTypes.string.isRequired,
  level: propTypes.number.isRequired,
  setIdUnder: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  commentForm: propTypes.node
}

export default React.memo(Comment);