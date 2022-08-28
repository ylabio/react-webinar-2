import { cn as bem } from "@bem-react/classname";
import React from 'react';
import "./style.css"
import propTypes from 'prop-types';

function CommentsCount({ count, t }) {
  const cn = bem('Comments-count');

  return (
    <p className={cn()}>
      {t("comments.title")}({count})
    </p>
  )
}

CommentsCount.propTypes = {
  count: propTypes.number,
  t: propTypes.func
}

CommentsCount.defaultProps = {
  count: 0,
  t: (text) => text
}

export default React.memo(CommentsCount);
