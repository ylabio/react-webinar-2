import React from "react";
import Stack from "../../../../components/stack";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import A from "../../../../components/a";

const Comment = ({ data, onComment }) => {
  const cn = bem('Comment');

  return (
      <Stack className={cn({lvl: Math.min(data.lvl || 0, 5)})} spacing={'small'}>
        <Stack direction={'row'}>
          <div className={cn("author")}>{data.author}</div>
          <div className={cn("date")}>{data.date}</div>
        </Stack>
          <div className={cn("text")}>{data.text}</div>
          <A onClick={onComment}>Ответить</A>
      </Stack>
    );
};

Comment.propTypes = {
  data: propTypes.object.isRequired,
  onComment: propTypes.func,
}

Comment.defaultProps = {
  onComment: () => {},
}

export default React.memo(Comment);
